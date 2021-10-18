import DataService from "../services/DataService";
import router from "../router/"

import {
    BAM
} from 'bam-ticketing-sdk';
const bam = new BAM('https://develop.bam.fan')
 bam.useOrganizer('eventspace')

export const getEvents = async ({commit}, dateRange) => {
    commit('loadingStatus', true)
    await bam.event.listEvents({
            with: {
                ticket_config: true,
                occurrence: true
            },
        }).then((response) => {
            console.log("events=> ",response)
            commit('setEvents', response)
            commit('loadingStatus', false)
        }).catch(error => {
            console.log(error);
        });
}

export const getEvent = async({commit}, id) => {
    commit('loadingStatus', true)
    await bam.event.getEvent({ id: id }).then((response) => {
        commit('setEvent', response)
        console.log("event==>",response)
        commit('loadingStatus', false)
    }).catch(error => {
        if (error.response.status == 404) {
            commit('loadingStatus', false)
            alert(`Data not found`);
            router.push('/')
        }
        console.log(error);
    });
}


export const sigleEventWithTimeSlot = async({commit}, data) => {
    console.log('timeSlotsss=>',data)
    commit('loadingStatus', true)
    await bam.event.getEvent({ id: data.event_id }).then((response) => {
        commit('setEventWithTimeSlot', response)
        commit('setTimeSlots',data.timeSlot)
        console.log("event",response)
        commit('loadingStatus', false)
    }).catch(error => {
        if (error.response.status == 404) {
            commit('loadingStatus', false)
            alert(`Data not found`);
            router.push('/')
        }
        console.log(error);
    });
}




export const getVenue = async ({commit},venue_id) => {
    let bam = new BAM("https://develop.bam.fan")
    commit('loadingStatus', true)
    // await DataService.venueAddress(venue_id).then((response) => {
    //     commit('setVenue', response.data.data)
    //     commit('loadingStatus', false)
    await bam.venue.getVenue({ id: venue_id }).then((response) => {
        commit('setVenue', response.data.data)
        console.log("setVenue",response)
        commit('loadingStatus', false)
    }).catch(error => {
        console.log(error);
        commit('loadingStatus', false)
    });

}


export const recurringEvent = async({commit}, id) => {
    commit('loadingStatus', true)
    await bam.event.getEvent({ id: id }).then((response) => {
        console.log("recurrinEevent==>",response)
        commit('setRecurringEvent', response)
        commit('loadingStatus', false)
    }).catch(error => {
        // if (error.response.status === 404) {
            commit('loadingStatus', false)
            alert(`Data not found`);
            router.push('/')
        // }
        console.log(error);
    });
}

export const createOrder = async({commit},cartItem)=>{
    console.log('createOrderItem=>', cartItem)
    commit('loadingStatus', true)
    // await bam.order.createOrder({
    //     orderItem: cartItem.cartItems,
    //     format:cartItem.format
    //     })
    let orderID=null;
    let ticketID =null;
        await DataService.createOrder(cartItem).then(async(response) => {
            console.log("events=> ",response.data.data.id)
            commit('setCreateOrder', response.data.data)
            // commit('getOrderDetails',response.data.data.id)
            orderID=response.data.data.id; //getting order Id for order details
            await DataService.getOrderDetails(orderID).then(async(response)=>{
                console.log("response-getOrderDetails:=> ",response)
                ticketID = response.data.data.order_item[0].ticket[0].id; //getting ticket Id for ticket holder
                await DataService.ticketHolder(ticketID).then((response)=>{
                    console.log("response-ticketHolder:=> ",response)
                })  

            })
            commit('loadingStatus', false)
            router.push('/user-form')
        }).catch(error => {
            console.log(error);
        });
}


export const orderContact = async({commit},data)=>{
    console.log('orderContact=>', data)
    commit('loadingStatus', true)
        await DataService.orderContact(data).then(async(response) => {
            console.log("orderContact=> ",response.data.data)
            commit('loadingStatus', false)
            // router.push('/payment-method')
        }).catch(error => {
            console.log(error);
        });
}


export const paymentInitiate = async({commit},data)=>{
    console.log('paymentInitiate1=>', data)
    commit('loadingStatus', true)
        await DataService.paymentInitiate(data).then(async(response) => {
            // console.log("paymentInitiate2=> ",response.data.data)
            commit('paymentInitiate', response.data.data)
            commit('loadingStatus', false)
            // router.push('/payment-method')
        }).catch(error => {
            console.log(error);
        });
}


export const startTimer = async ({commit})=>{
    commit('timer');
}


export const downloadTicket = async ({commit},orderID)=>{
    console.log('orderIDForPayment',orderID)
    await DataService.downloadTicket(orderID)
    .then((response) => {
        commit('downloadTicket', response)
        console.log("downloadTicket",response)
        commit('loadingStatus', false)
    }).catch(error => {
        if (error.response.status == 404) {
            commit('loadingStatus', false)
            alert(`Data not found`);
            router.push('/')
        }
        console.log(error);
    });
}


import download from 'downloadjs' //
export const downloadTicketPdf = async ({commit},data)=>{
    console.log('PDF',data)
    await DataService.downloadTicketPdf(data)
    .then((response) => {
        const content = response.headers['content-type'];
           download(response.data, 'ticket.pdf', content)
        commit('downloadTicketPdf', response.data)
        console.log("downloadTicketPdf",response)
        commit('loadingStatus', false)
    }).catch(error => {
        if (error.response.status == 404) {
            commit('loadingStatus', false)
            alert(`Data not found`);
            router.push('/')
        }
        console.log(error);
    });
}


