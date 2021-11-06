
import router from "../router/";
import moment from "moment";
import download from 'downloadjs'
import bam from '../services/bamSdk'
import {saveStreamToFile} from 'bam-ticketing-sdk';

export const getEvents = async ({commit}, dateRange) => {
    console.log("DateRange:", dateRange)
    commit('loadingStatus', true)
    let startDateFormat = '';
    let endDateFormat = '';
    startDateFormat = moment(dateRange.start,'YYYY-MM-DD').toDate();
    endDateFormat = moment(dateRange.end,'YYYY-MM-DD').toDate();
    let dateRng = [startDateFormat,endDateFormat];
    console.log('dateRange=>',dateRng)
    if(dateRange){
        await bam.event.listEvents({
            with: {
                ticket_config: true,
                occurrence: true,
            },
            start_at:dateRng,
        }).then((response) => {
            commit('setEvents', response)
            commit('loadingStatus', false)
        }).catch(response => {
            console.log(response);
            commit('errorMsg', response);
        });
    }else{
        await bam.event.listEvents({
            with: {
                ticket_config: true,
                occurrence: true,
            },
        }).then((response) => {
            commit('setEvents', response)
            commit('loadingStatus', false)
        }).catch(response => {
            console.log(response);
            commit('errorMsg', response);
        });
    }
   
}

export const getEvent = async ({
    commit
}, id) => {
    commit('loadingStatus', true)
    await bam.event.getEvent({
        id: id
    }).then((response) => {
        commit('setEvent', response)
        console.log("event==>", response)
        commit('loadingStatus', false)
    }).catch(response => {
        commit('loadingStatus', false)
        console.log(response);
        commit('errorMsg', response);
    });
}


export const sigleEventWithTimeSlot = async ({commit}, data) => {
    commit('loadingStatus', true)
    await bam.event.getEvent({
        id: data.event_id
    }).then((response) => {
        commit('setEventWithTimeSlot', response)
        commit('setTimeSlots', data.timeSlot)
        commit('loadingStatus', false)
    }).catch(response => {
        commit('loadingStatus', false)
        console.log(response);
        commit('errorMsg', response);
    });
}


export const workSpaceKey = async ({commit}) => {
    let organizer = await bam.account.getOrganizer({
        id: 'eventspace',
        fields: ['workspace']
    });
    console.log("workSpaceKey", organizer)
    commit('workSpaceKey', organizer)

}

export const recurringEvent = async ({commit}, id) => {
    commit('loadingStatus', true)
    await bam.event.getEvent({id: id}).then((response) => {
        commit('setRecurringEvent', response)
        commit('loadingStatus', false)
    }).catch(response => {
        commit('loadingStatus', false)
        alert(`Data not found`);
        router.push('/')
        console.log(response);
        commit('errorMsg', response);
    });
}





export const createOrder = async ({commit}, cartItem) => {
    console.log('createdOrderItem=>', cartItem)
    commit('loadingStatus', true)
    await bam.order.createOrder({
        orderItem: cartItem.cartItems,
        format:cartItem.format
    }).then((response) => {
        commit('loadingStatus', false)
        commit('setCreateOrder', response)
        console.log('gettingOrderItem=>', response)
        router.push('/user-kyc-form')
        }).catch(response => {
            console.log(response);
            commit('errorMsg', response);
        });
    
}

export const ticketHolderInfo = async ({commit}, data) => {
    console.log("=>",data)
    commit('loadingStatus', true)
    data.orderItem.forEach(async(element,i) => {
        await bam.order.createTicketHolder({id:element.ticket[0].id},
            {
                firstName: data.data.first_name[i],
                lastName: data.data.last_name[i],
                email: data.data.email[i],
                phone: data.data.phone[i],
            }
        )
        .then((response) => {
            commit('loadingStatus', false)
            // commit('setTicketHolder', response)
            router.push('/user-form')
        }).catch(response => {
            console.log(response);
            commit('errorMsg', response);
        });
        
    });
    
}


export const orderContact = async ({
    commit
}, data) => {
    console.log("=>=>",data);
    commit('loadingStatus', true)
    await bam.order.createOrderContact({ id: data.id }, 
        {
            first_name: data.data.first_name,
            last_name: data.data.last_name,
            phone: data.data.phone,
            email: data.data.email,
            billing_email: data.data.billing_email,
        }
    )
    .then((response) => {
        console.log(response);
        commit('loadingStatus', false)
    }).catch(response => {
        console.log(response);
        commit('errorMsg', response);
    });
}


export const paymentInitiate = async ({commit}, data) => {
    commit('loadingStatus', true)
    await bam.payment.createPaymentIntent({
        orderId: data.id,
        type: data.payMethod
    })
    .then(async (response) => {
        console.log("paymentInitiate2=> ",response)
        commit('paymentInitiate', response)
        commit('loadingStatus', false)
    }).catch(response => {
        console.log(response);
        commit('errorMsg', response);
    });
}


export const startTimer = async ({commit}) => {
    commit('timer');
}



export const downloadTicketPdf = async ({commit}, data) => {
setTimeout(async () => {
    let response = await bam.order.downloadTickets({ id: data.orderId })
    console.log('ticketResp',response)
}, 3000)

}