import DataService from "../services/DataService";
import router from "../router/"

import {
    BAM
} from 'bam-ticketing-sdk';
const bam = new BAM("https://develop.bam.fan")
 bam.useOrganizer("eventspace")

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

export const getVenue = async ({
    commit
}, venue_id) => {
    commit('loadingStatus', true)
    await DataService.venueAddress(venue_id).then((response) => {
        commit('setVenue', response.data.data)
        commit('loadingStatus', false)
    }).catch(error => {
        console.log(error);
        commit('loadingStatus', false)
    });

}


export const recurringEvent = async({commit}, id) => {
    commit('loadingStatus', true)
    await bam.event.getEvent({ id: id }).then((response) => {
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

export const createOrder = async({commit})=>{
    commit('loadingStatus', true)
    await bam.order.createOrder({
        orderItem: [
            {
                quantity: 4,
                ticketConfigId: 7489
            }
        ],
        format: 'PDF',
        orderContact: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'johndoe@bam.fan'
        }
        }).then((response) => {
            console.log("events=> ",response)
            commit('setEvents', response)
            commit('loadingStatus', false)
        }).catch(error => {
            console.log(error);
        });
}