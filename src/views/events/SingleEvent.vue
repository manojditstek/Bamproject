<template>
<div class="d-flex justify-content-between align-items-end header">
    <h2>
        <router-link to="/">
            <i class="fa fa-angle-left" aria-hidden="true"></i>
            {{singleEvent?lengthOfString(singleEvent.name):''}}
        </router-link>
    </h2>
    <div class="datePicker"></div>
</div>

<div class="innerWraper">
    <div class="cardWrapper d-flex">
        <div class="dateCol">
            <EventDateFormat :eventDate="singleEvent?singleEvent.startAt:''" />
        </div>
        <div class="detailsCol">
            <h2>{{singleEvent.name}}</h2>
            <VenuAddress :venue_id="singleEvent.venue_id" />
        </div>
    </div>
</div>
<div class="cardBodyWrapper" v-if="singleEvent.timeslot?singleEvent.timeslot.length>0:''">
     <Loader />
     <TimeSlot :timeSlot="timeSlot" :eventName="singleEvent.name"  :tickets="singleEvent?singleEvent:''" v-for="timeSlot in singleEvent ? singleEvent.timeslot : ''" :key="timeSlot.id"  @click="timeSlot()"/>
</div>
<div v-else class="cardBodyWrapper">
    <Loader />
    <Tickets :ticket="ticket" :eventName="singleEvent.name" v-for="ticket in singleEvent ? singleEvent.ticketConfig : ''" :key="ticket.id" />
</div>

<div class="singleTicketTotalAmount d-flex" v-if="totalQuantity">
    <TotalTicketCalculation />
    <div class="labelBtn">
        <router-link to="/shop" class="button">Cart</router-link>
    </div>
</div>
</template>

<script>
// import {
//     useRouter
// } from "vue-router";

import {
    useStore
} from 'vuex';
import moment from "moment";
import {
    computed
} from '@vue/reactivity';
import VenuAddress from "../../components/singleEvent/venuAddress/VenueAddress.vue"
import EventDateFormat from "../../components/singleEvent/EventDate.vue";
import Tickets from "../../components/singleEvent/timeSlots/ticketList/Tickets.vue"
import TotalTicketCalculation from "../../components/cartModule/TotalTicketCalculation.vue"
import TimeSlot from "../../components/singleEvent/timeSlots/TimeSlot.vue"
import Loader from '../../components/loader/Loader.vue';

export default {
    name: 'SingleEvent',
    components: {
        VenuAddress,
        EventDateFormat,
        Tickets,
        TotalTicketCalculation,
        TimeSlot,
        Loader
    },

    setup() {
        const store = useStore();
        function timeSlot() {
            // router.push({
            //     path: '/single-event-ticket-category'
            // })
        }

         const loaderStatus = computed(() => {
            return store.state.loadingStatus;
        });

        const totalQuantity = computed(() => {
            return store.state.cart.itemsTotalQuantity;
        });

        

        const singleEvent = computed(() => {
            return store.state.event;
        })
        return {
            timeSlot,
            singleEvent,
            totalQuantity,
            loaderStatus,
            //startDate,
            //endDate

        }
    },

    methods: {
        dateFormat(value) {
            return moment(value).format("MM/DD/YYYY ");
        },
        
        timeFormat(value) {
            return moment(value).format(" HH:mm a");
        },

        lengthOfString(value){
            if(value?value.length>48:''){
                return value.substring(0,48)+ '...'
            }else{
                return value
            }
        }
    
    },

}
</script>

<style>

</style>
