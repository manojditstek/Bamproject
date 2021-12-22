/* Including headers file */
import router from "../router/"
import moment from "moment"
import bam from '../main'
import Swal from 'sweetalert2'
// import {saveStreamToFile} from 'bam-ticketing-sdk';
import download from "downloadjs"


/* end header */

/* This method used for multiple events */
export const getEvents = async ({ commit }, dateRange) => {
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

export const getCustomEvent = async ({ commit, state }) => {
    try {

        let response = await bam.event.getEvent({
            id: state.eventID
        })
        commit('setEvent', response)
        commit('loadingStatus', false)
    } catch (error) {
        commit('loadingStatus', false)
        commit('errorMsg', error);
    }
}

/* This method used for single event */
export const getEvent = async ({ commit }, id) => {
    commit('loadingStatus', true)
    try {
        let response = await bam.event.getEvent({
            id: id
        })
        commit('setEvent', response)
        router.push('/single-event')
        commit('loadingStatus', false)
    } catch (error) {
        commit('loadingStatus', false)
        commit('errorMsg', error);
    }
}
//end single event
/* This method used for single event with time slots  */
export const sigleEventWithTimeSlot = async ({ commit }, data) => {
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
export const workSpaceKey = async ({ commit }) => {
    commit('loadingStatus', true)
    try {
        let organizer = await bam.account.getOrganizer({
            id: 'eventspace',
            fields: ['workspace']
        });
        commit('loadingStatus', false)
        commit('workSpaceKey', organizer)
    } catch (error) {
        commit('loadingStatus', false)
        commit('errorMsg', error);
    }
}
// end seated event

/* This method used for recurring event*/
export const recurringEvent = async ({ commit }, id) => {
    commit('loadingStatus', true)
    try {
        let response = await bam.event.getEvent({
            id: id
        })
        commit('setRecurringEvent', response)
        router.push('/recurring-event')
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
export const createOrder = async ({ commit }, cartItem) => {
    commit('loadingStatus', true)
    try {
        let response = await bam.order.createOrder({
            orderItem: cartItem.order_item,
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
export const ticketHolderInfo = async ({ commit }, data) => {
    let isValidForm = true;
    data.orderItem.forEach(async (element, i) => {

        element.ticket.forEach(async (item, j) => {
            if (!data.data.first_name[i + '' + j]) {
                isValidForm = false
            }
            if (!data.data.last_name[i + '' + j]) {
                isValidForm = false
            }
            if (!data.data.email[i + '' + j]) {
                isValidForm = false
            }
            if (!data.data.phone[i + '' + j] || isNaN(data.data.phone[i + '' + j]) || (data.data.phone[i + '' + j]).length < 7 || (data.data.phone[i + '' + j]).length > 18) {
                isValidForm = false
            }
        })
    })

    if (isValidForm) {
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
}
// end ticket holder information

/* This method used for storing order contact details  */
export const orderContact = async ({ commit }, data) => {
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
        })

        commit('loadingStatus', false)
    } catch (response) {
        commit('errorMsg', response);
        commit('loadingStatus', false)
    }
}
// end order contact details


/* This method used for Payment module  */
export const paymentInitiate = async ({ commit, state }, data) => {
    commit('loadingStatus', true)
    if (!state.submitting) {
        state.submitting = true;
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
        finally {
            state.submitting = false;
        }
    }
}
//end Payment module 

/* This method used for set timer  */
export const startTimer = async ({ commit }) => {
    commit('timer');
}
//end set timer


/* This method used for download ticket  */
export const downloadTicketPdf = async ({ commit, state }, data) => {
    commit('loadingStatus', true)
    setTimeout(async () => {
        if (!state.submitting) {
            state.submitting = true;
            try {
                let ticket = await bam.order.downloadTickets({
                    id: data.orderId
                })
                download(ticket, "ticket.pdf", "application/pdf")
                // await saveStreamToFile(ticket, 'ticket.pdf');
                const Toast = Swal.mixin({
                    toast: true,
                    // position: 'top',
                    showConfirmButton: false,
                    timer: 5000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })
                Toast.fire({
                    icon: 'success',
                    title: 'Ticket Downloaded!',
                    target: "#custom-target",
                    customClass: {
                        container: "payment-card ",
                    },
                })
                commit('loadingStatus', false)
            } catch (error) {
                commit('errorMsg', error);
                commit('loadingStatus', false)
            }
            finally {
                state.submitting = false;
            }
        }
    }, 3000)

}

//end download ticket

