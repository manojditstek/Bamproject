/* Including headers file */
import router from "../router/";
import moment from "moment";
import bam from '../services/bamSdk'
// import {saveStreamToFile} from 'bam-ticketing-sdk';
// import download from "downloadjs";

/* end header */

/* This method used for multiple events */
export const getEvents = async ({commit}, dateRange) => {
    commit('loadingStatus', true)
    let startDateFormat = '';
    let endDateFormat = '';
    startDateFormat = moment(dateRange.start, 'YYYY-MM-DD').toDate();
    endDateFormat = moment(dateRange.end, 'YYYY-MM-DD').toDate();
    let dateRng = [startDateFormat, endDateFormat];
    if (dateRange) {
        try {
            let response = await bam.event.listEvents({
                with: {
                    ticket_config: true,
                    occurrence: true,
                },
                start_at: dateRng,
            })
            if (response == '') {
                let msg = {
                    message: 'Event Not found !'
                }
                commit('errorMsg', msg);
            } else {

                commit('errorMsg', null);
            }
            commit('setEvents', response)
            commit('loadingStatus', false)
        } catch (error) {
            commit('errorMsg', error);
            commit('loadingStatus', false)
        }
    } else {
        try {
            let response = await bam.event.listEvents({
                with: {
                    ticket_config: true,
                    occurrence: true,
                },
            })
            commit('setEvents', response)
            commit('loadingStatus', false)
        } catch (error) {
            commit('errorMsg', error);
            commit('loadingStatus', false)
        }
    }
} /* end multiple evets */


/* This method used for single event */
export const getEvent = async ({commit}, id) => {
    commit('loadingStatus', true)
    try {
        let response = await bam.event.getEvent({
            id: id
        })
        commit('setEvent', response)
        commit('loadingStatus', false)
    } catch (error) {
        commit('loadingStatus', false)
        commit('errorMsg', error);
    }
}
//end single event

/* This method used for single event with time slots  */
export const sigleEventWithTimeSlot = async ({commit}, data) => {
    commit('loadingStatus', true)
    try {
        let response = await bam.event.getEvent({
            id: data.event_id
        })
        commit('setEventWithTimeSlot', response)
        commit('setTimeSlots', data.timeSlot)
        commit('loadingStatus', false)
    } catch (error) {
        commit('loadingStatus', false)
        commit('errorMsg', error);
    }
}
//end time slots evevnt


/* This method used for seated event */
export const workSpaceKey = async ({commit}) => {
    commit('loadingStatus', true)
    try {
        let organizer = await bam.account.getOrganizer({
            id: 'eventspace',
            fields: ['workspace']
        });
        commit('workSpaceKey', organizer)
    } catch (error) {
        commit('loadingStatus', false)
        commit('errorMsg', error);
    }
}
// end seated event

/* This method used for recurring event*/
export const recurringEvent = async ({commit}, id) => {
    commit('loadingStatus', true)
    try {
        let response = await bam.event.getEvent({
            id: id
        })
        commit('setRecurringEvent', response)
        commit('loadingStatus', false)
    } catch (error) {
        commit('loadingStatus', false)
        alert(`Data not found`);
        router.push('/')
        commit('errorMsg', error);
    }
}
// end recurring event



/* This method used for create order */
export const createOrder = async ({commit}, cartItem) => {
    commit('loadingStatus', true)
    try {
        let response = await bam.order.createOrder({
            orderItem: cartItem.cartItems,
            format: cartItem.format
        })
        commit('loadingStatus', false)
        commit('setCreateOrder', response)
        if (cartItem.kycLevelId == 1) {
            router.push('/user-form')
        } else {
            router.push('/user-kyc-form')
        }
    } catch (error) {
        commit('errorMsg', error);
        commit('loadingStatus', false)
    }

}
// end create order method

/* This method used for storing ticket holder information  */
export const ticketHolderInfo = async ({commit}, data) => {
    commit('loadingStatus', true)
    data.orderItem.forEach(async (element, i) => {
        element.ticket.forEach(async (item, j) => {
            try {
                await bam.order.createTicketHolder({
                    id: item.id
                }, {
                    firstName: data.data.first_name[i + '' + j],
                    lastName: data.data.last_name[i + '' + j],
                    email: data.data.email[i + '' + j],
                    phone: data.data.phone[i + '' + j],
                })
                commit('loadingStatus', false)
                router.push('/user-form')
            } catch (error) {
                commit('errorMsg', error);
                commit('loadingStatus', false)
            }
        })
    })
}
// end ticket holder information

/* This method used for storing order contact details  */
export const orderContact = async ({commit}, data) => {
    commit('loadingStatus', true)
    if (data.data.billing_email) {
        data.data.email = data.data.billing_email
    }
    try {
        await bam.order.createOrderContact({
            id: data.id
        }, {
            first_name: data.data.first_name,
            last_name: data.data.last_name,
            phone: data.data.phone,
            email: data.data.email,
            // billing_email: data.data.billing_email,
        })

        commit('loadingStatus', false)
    } catch (response) {
        commit('errorMsg', response);
        commit('loadingStatus', false)
    }
}
// end order contact details


/* This method used for Payment module  */
export const paymentInitiate = async ({commit}, data) => {
    commit('loadingStatus', true)
    try {
        let response = await bam.payment.createPaymentIntent({
            orderId: data.id,
            type: data.payMethod
        })

        commit('paymentInitiate', response)
        commit('loadingStatus', false)
    } catch (error) {
        commit('errorMsg', error);
        commit('loadingStatus', false)
    }
}
//end Payment module 

/* This method used for set timer  */
export const startTimer = async ({commit}) => {
    commit('timer');
}
//end set timer


/* This method used for download ticket  */
export const downloadTicketPdf = async ({commit}, data) => {
    setTimeout(async () => {
        try {
            let ticket = await bam.order.downloadTickets({
                id: data.orderId
            })
            saveByteArray([ticket], 'ticket.pdf');
            // await saveStreamToFile(ticket, 'ticket.pdf');
        } catch (error) {
            commit('errorMsg', error);
            commit('loadingStatus', false)
        }
    }, 3000)


}

//end download ticket

/* This is helper method for downloading ticket  */
var saveByteArray = (function () {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return function (data, name) {
        var blob = new Blob([data], {
                type: "application/pdf"
            }),
            url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = name;
        a.click();
        window.URL.revokeObjectURL(url);
    };
}());
//end 