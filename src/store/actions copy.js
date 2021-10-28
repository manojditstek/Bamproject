import DataService from "../services/DataService";
import router from "../router/";
import moment from "moment";
import bam from '../services/bamSdk'

export const getEvents = async ({
    commit
}, dateRange) => {
    console.log("DateRange:", dateRange)
    commit('loadingStatus', true)
    let startDateFormat = '';
    let endDateFormat = '';
    startDateFormat = moment(dateRange.start).format('YYYY-MM-DD')
    endDateFormat = moment(dateRange.end).format('YYYY-MM-DD')
    let query = `createdAt=${startDateFormat};${endDateFormat}`
    await bam.event.listEvents({
        with: {
            ticket_config: true,
            occurrence: true,
        },
        // query: query,
    }).then((response) => {
        console.log("events=> ", response)
        commit('setEvents', response)
        commit('loadingStatus', false)
    }).catch(error => {
        console.log(error);
        commit('errorMsg', error.response.data);
    });
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
        // if (error.response.status == 404) {
        //     commit('loadingStatus', false)
        //     alert(`Data not found`);
        //     router.push('/')
        // }
        console.log(error);
        commit('errorMsg', error.response.data);
    });
}


export const sigleEventWithTimeSlot = async ({
    commit
}, data) => {
    // console.log('timeSlotsss=>',data)
    commit('loadingStatus', true)
    await bam.event.getEvent({
        id: data.event_id
    }).then((response) => {
        commit('setEventWithTimeSlot', response)
        commit('setTimeSlots', data.timeSlot)
        // console.log("event",response)
        commit('loadingStatus', false)
    }).catch(error => {
        // if (error.response.status == 404) {
        //     commit('loadingStatus', false)
        //     alert(`Data not found`);
        //     router.push('/')
        // }
        console.log(error);
        commit('errorMsg', error.response.data);
    });
}


export const workSpaceKey = async ({
    commit
}) => {
    let organizer = await bam.account.getOrganizer({
        id: 'eventspace',
        fields: ['workspace']
    });
    console.log("workSpaceKey:", organizer)
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





export const recurringEvent = async ({
    commit
}, id) => {
    commit('loadingStatus', true)
    await bam.event.getEvent({
        id: id
    }).then((response) => {
        // console.log("recurrinEevent==>",response)
        commit('setRecurringEvent', response)
        commit('loadingStatus', false)
    }).catch(error => {
        // if (error.response.status === 404) {
        commit('loadingStatus', false)
        alert(`Data not found`);
        router.push('/')
        // }
        console.log(error);
        commit('errorMsg', error.response.data);
    });
}

export const createOrder = async ({
    commit
}, cartItem) => {
    console.log('createOrderItem=>', cartItem)
    commit('loadingStatus', true)
   const response = await bam.order.createOrder({
        orderItem: cartItem.cartItems,
        format:cartItem.format,
        orderContact: {
            firstName: cartItem.data.first_name,
            lastName: cartItem.data.last_name,
            email: cartItem.data.email,
            phone:cartItem.data.phone
        }
    })
    
    let orderID = null
    // await DataService.createOrder(cartItem)
    // .then(async (response) => {
        console.log("createOrderID=> ",response.id)
        commit('setCreateOrder', response)
        // commit('getOrderDetails',response.data.data.id)
        orderID = response.id; //getting order Id for order details
        // await DataService.getOrderDetails(orderID)
        const respGetOrder = await bam.order.getOrder({id:orderID})
        // .then(async (response) => {
            console.log("response-getOrderDetails:=> ",respGetOrder)
            // await response.order_item.forEach((element) => {
                // console.log('getting ticket Id',element.ticket[0].id),
                // DataService.ticketHolder(response.order_item[0].ticket[0].id,cartItem.data)

               const ticketHolder= await bam.order.createTicketHolder({
                    id:1295,
                    holder:{
                        firstName: 'test1',
                        lastName: 'test2',
                        email: 'test@test.co',
                        phone: '1234567891',
                    }
                })

                // console.log("response-ticketHolder:=> ", respTicketHolder)
                // .then(async (response) => {
                //     console.log("response-ticketHolder:=> ", response)
                // })
            // });
        // })
        commit('loadingStatus', false)
        // commit('ticketHolderInfo', ticketHolder)
        // router.push('/user-form')
    // }).catch(error => {
    //     console.log(error.response.data.message);
    //     commit('errorMsg', error.response.data);
    // });
}


export const orderContact = async ({
    commit
}, data) => {
    // console.log('orderContact=>', data)
    commit('loadingStatus', true)
    await DataService.orderContact(data).then(async (response) => {
        // console.log("orderContact=> ",response.data.data)
        commit('loadingStatus', false)
        // router.push('/payment-method')
    }).catch(error => {
        console.log(error);
        commit('errorMsg', error.response.data);
    });
}


export const paymentInitiate = async ({
    commit
}, data) => {
    // console.log('paymentInitiate1=>', data)
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


// export const downloadTicket = async ({
//     commit
// }, orderID) => {
//     // console.log('orderIDForPayment',orderID)
//     await DataService.downloadTicket(orderID)
//     // await bam.order.downloadTickets({ orderId:orderID })
//         .then((response) => {
//             commit('downloadTicket', response)
//             // console.log("downloadTicket",response)
//             commit('loadingStatus', false)
//         }).catch(error => {
//             // if (error.response.status == 404) {
//             //     commit('loadingStatus', false)
//             //     alert(`Data not found`);
//             //     router.push('/')
//             // }
//             console.log(error.response.data);
//             commit('errorMsg', error.response.data);
//         });
// }


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