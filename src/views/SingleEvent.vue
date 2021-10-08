<template>
<div class="d-flex justify-content-between align-items-end header">
    <h2>
        <router-link to="/">
            <i class="fa fa-angle-left" aria-hidden="true"></i>
            {{singleEvent?singleEvent.name:''}}
        </router-link>
    </h2>
    <div class="datePicker"></div>
</div>

<div class="innerWraper">
    <div class="cardWrapper d-flex">
        <div class="dateCol">
            <EventDateFormat :eventDate="singleEvent?singleEvent.start_at:''" />
        </div>
        <div class="detailsCol">
            <!-- <p>08:30 pm - 11:30 pm</p> -->
            <h2>{{singleEvent.name}}</h2>
            <VenuAddress :venue_id="singleEvent.venue_id" />
        </div>
    </div>
</div>
<div class="cardBodyWrapper" v-if="singleEvent.timeslot.length>0">
    <div v-if="loaderStatus" class="loader">
        <div class="loaderWrapper">
            <img src="@/assets/images/loading-buffering.gif" alt="Image">
        </div>
    </div>
     <TimeSlot :timeSlot="timeSlot" :ticket="timeSlot.ticket_config? timeSlot.ticket_config.id:''" v-for="timeSlot in singleEvent ? singleEvent.timeslot : ''" :key="timeSlot.id"  @click="timeSlot()"/>
</div>
<div v-else class="cardBodyWrapper">
    <div v-if="loaderStatus" class="loader">
        <div class="loaderWrapper">
            <img src="@/assets/images/loading-buffering.gif" alt="Image">
        </div>
    </div>
    <Tickets :ticket="ticket" v-for="ticket in singleEvent ? singleEvent.ticket_config : ''" :key="ticket.id" />
</div>

<div class="singleTicketTotalAmount d-flex" v-if="totalQuantity">
    <TotalTicketCalculation />
    <div class="labelBtn">
        <router-link to="/shop" class="button">Cart</router-link>
    </div>
</div>
</template>

<script>
import {
    useRouter
} from "vue-router";

import {
    useStore
} from 'vuex';
import moment from "moment";
import {
    computed
} from '@vue/reactivity';
import VenuAddress from "../components/VenueAddress.vue"
import EventDateFormat from "../components/EventDate.vue";
import Tickets from "../components/Tickets.vue"
import TotalTicketCalculation from "../components/TotalTicketCalculation.vue"
import TimeSlot from "../components/TimeSlot.vue"
export default {
    name: 'SingleEvent',
    components: {
        VenuAddress,
        EventDateFormat,
        Tickets,
        TotalTicketCalculation,
        TimeSlot
    },

    setup() {
        const router = useRouter();
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
        }
    },

}
</script>

<style>

</style>
