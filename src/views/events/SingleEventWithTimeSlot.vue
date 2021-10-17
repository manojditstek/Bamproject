<template>
<div class="d-flex justify-content-between align-items-end header">
    <h2>
        <router-link to="/single-event">
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
            <p>{{timeFormat(timeSlot.startAt)}} – {{timeFormat(timeSlot.endAt)}}</p>
            <h2>{{singleEvent.name}}</h2>
            <VenuAddress :venue_id="singleEvent.venueId" />
        </div>
    </div>
</div>
<div  class="cardBodyWrapper">
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
import Loader from '../../components/loader/Loader.vue';

export default {
    name: 'SingleEvent',
    components: {
        VenuAddress,
        EventDateFormat,
        Tickets,
        TotalTicketCalculation,
        Loader
    },

    setup() {
        const store = useStore();
         const loaderStatus = computed(() => {
            return store.state.loadingStatus;
        });

        const timeSlot = computed(() => {
            return store.state.timeSlot;
        });

        const totalQuantity = computed(() => {
            return store.state.cart.itemsTotalQuantity;
        });

        function timeFormat(value) {
            return moment(value).format(" HH:mm a");
        }

        function dateFormat(value) {
            return moment(value).format("MM/DD/YYYY ");
        }
        
        

        function lengthOfString(value){
            if(value?value.length>48:''){
                return value.substring(0,48)+ '...'
            }else{
                return value
            }
        }

        const singleEvent = computed(() => {
            return store.state.event;
        })
        return {
            timeSlot,
            singleEvent,
            totalQuantity,
            loaderStatus,
            timeFormat,
            dateFormat,
            lengthOfString
            //startDate,
            //endDate

        }
    },

  

}
</script>

<style>

</style>
