import DataService from "../services/DataService";
import router from "../router/";
import moment from "moment";
import bam from '../services/bamSdk'

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
    }).catch(error => {
        commit('loadingStatus', false)
        console.log(error);
        commit('errorMsg', error.response);
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
    }).catch(error => {
        commit('loadingStatus', false)
        console.log(error);
        commit('errorMsg', error.response.data);
    });
}


export const workSpaceKey = async ({commit}) => {
    // let response = await bam.account.getSeatsWorkspacesForOrganizer({
    //     id:'eventspace'
    // });
    let organizer = await bam.account.getOrganizer({
        id: 'eventspace',
        fields: ['workspace']
    });
    console.log("workSpaceKey", organizer)
    commit('workSpaceKey', organizer)

}


// export const getVenue = async ({commit},venue_id) => {
//     commit('loadingStatus', true)
//     await bam.venue.getVenue({ id: venue_id }).then((response) => {
//         commit('setVenue', response)
//         commit('loadingStatus', false)
//     }).catch(error => {
//         commit('loadingStatus', false)
//     });
// }

export const recurringEvent = async ({commit}, id) => {
    commit('loadingStatus', true)
    await bam.event.getEvent({id: id}).then((response) => {
        commit('setRecurringEvent', response)
        commit('loadingStatus', false)
    }).catch(error => {
        commit('loadingStatus', false)
        alert(`Data not found`);
        router.push('/')
        console.log(error);
        commit('errorMsg', error.response.data);
    });
}

export const createOrder = async ({commit}, cartItem) => {
    console.log('createdOrderItem=>', cartItem)
    commit('loadingStatus', true)
    await bam.order.createOrder({
        orderItem: cartItem.cartItems,
        format:cartItem.format,
        orderContact: {
            firstName: 'test1',
            lastName: 'test2',
            email: 'test@test.co',
            phone: '1234567891',
        }
        }).then((response) => {
        commit('loadingStatus', false)
        commit('SetOrderItem',response)
        router.push('/user-form')
        }).catch(response => {
            console.log(response);
            commit('errorMsg', response);
        });
    
}

export const ticketHolderInfo = async ({commit}, data) => {
    commit('loadingStatus', true)
    await bam.order.createTicketHolder({
        id:data.ticketID,
        holder:{
            firstName: 'test1',
            lastName: 'test2',
            email: 'test@test.co',
            phone: '1234567891',
        }
    })
    .catch(error => {
        console.log(error);
        commit('errorMsg', error.response.data);
    });
}


export const orderContact = async ({
    commit
}, data) => {
    commit('loadingStatus', true)
    await DataService.orderContact(data).then(async (response) => {
        commit('loadingStatus', false)
        // router.push('/payment-method')
    }).catch(error => {
        console.log(error);
        commit('errorMsg', error.response.data);
    });
}


export const paymentInitiate = async ({commit}, data) => {
    commit('loadingStatus', true)
    // await bam.payment.createPaymentIntent({
    //     orderId: data.id,
    //     type: data.payMethod
    // })
    await DataService.paymentInitiate(data)
    .then(async (response) => {
        // console.log("paymentInitiate2=> ",response.data.data)
        commit('paymentInitiate', response.data.data)
        commit('loadingStatus', false)
        // router.push('/payment-method')
    }).catch(error => {
        console.log(error);
        commit('errorMsg', error.response.data);
    });
}


export const startTimer = async ({
    commit
}) => {
    commit('timer');
}

import download from 'downloadjs' // for ticket download 
export const downloadTicketPdf = async ({
    commit
}, data) => {
    console.log('PDF', data)
    // await DataService.downloadTicketPdf(data)
    await bam.order.downloadTickets({ id:data.orderId })
        .then((response) => {
            const content = response.headers['content-type'];
            download(response.data, 'ticket.pdf', content)
            commit('downloadTicketPdf', response.data)
            // console.log("downloadTicketPdf",response)
            commit('loadingStatus', false)
        }).catch(error => {
            if (error.response.status == 404) {
                const content = error.response.headers['content-type'];
                commit('loadingStatus', false)
                // commit('errorMsg',error.response);
                alert(`Data not found`);
            }
            console.log("error=>", error.response);

        });
}