<template>
<div v-if="singleEventData==''">
<div class="d-flex justify-content-between align-items-end header" >
    <h2>
        <router-link to="/">
            <i class="fa fa-angle-left" aria-hidden="true"></i>
            Events
        </router-link>
    </h2>
    <div class="datePicker">
        <div class="datePicker">
            <DateRangePicker v-model="range" :disabled="recurringEvent?recurringEvent.length<1:''" />
        </div>
    </div>
</div>

<div class="innerWraper">
    <div class="cardWrapper d-flex">
        <div class="dateCol">
            <h2>{{recurringEvent?recurringEvent.occurrence.length:''}}</h2>
            <h4>Events</h4>
        </div>
        <div class="detailsCol">
            <p>{{dateFormat(recurringEvent?recurringEvent.startAt:'')}} - {{dateFormat(recurringEvent?recurringEvent.endAt:'')}}</p>
            <h2>{{recurringEvent?recurringEvent.name:''}}</h2>
            <VenuAddress :venue_id="recurringEvent?recurringEvent.venueId:''" />
        </div>
    </div>
</div>
<div class="cardBodyWrapper">
    <Loader />
    <div class="cardWrapper d-flex" @click="singleEvent(event)" v-for="event in recurringEvent?recurringEvent.occurrence:''" :key="event.id">
        <div class="dateCol">
            <EventDateFormat :eventDate="event?event.startAt:''" />
        </div>
        <div class="detailsCol">
            <h2>{{recurringEvent?recurringEvent.name:''}}::{{event.venueId}}</h2>
            <VenuAddress :venue_id="event?event.venueId:''" />
            <div class="priceWrap">
                <p>from</p>0.00 EUR
            </div>
        </div>
        <div class="collapseArrow">
            <i class="fa fa-angle-right"></i>
        </div>
    </div>
</div>
</div>
<!-- for occurrences -->
<div v-else>
<div class="d-flex justify-content-between align-items-end header">
    <h2 @click="reSet">
            <i class="fa fa-angle-left" aria-hidden="true"></i>
            Events
    </h2>
</div>

<div class="innerWraper">
    <div class="cardWrapper d-flex">
        <div class="dateCol" v-if="singleEventData==''">
            <h2>{{recurringEvent?recurringEvent.occurrence.length:''}}</h2>
            <h4>Events</h4>
        </div>
        <div class="dateCol" v-else>
            <EventDateFormat :eventDate="singleEventData?singleEventData.startAt:''" />
        </div>
        <div class="detailsCol">
            <h2>{{recurringEvent?recurringEvent.name:''}}</h2>
            <VenuAddress :venue_id="recurringEvent?recurringEvent.venueId:''" />
        </div>
    </div>
</div>
<div  class="cardBodyWrapper">
    <Loader />
    <Tickets :ticket="ticket" :eventName="recurringEvent.name" v-for="ticket in singleEvent ? singleEventData.ticketConfig : ''" :key="ticket.id" />
</div>
</div>
<!-- end occurrences -->
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
    computed,
    ref
} from '@vue/reactivity';
import VenuAddress from "../../components/singleEvent/venuAddress/VenueAddress.vue"
import EventDateFormat from "../../components/singleEvent/EventDate.vue";
import DateRangePicker from "../../components/dateRangePicker/dateRangePicker.vue"
import Loader from '../../components/loader/Loader.vue'
export default {
    name: 'RecurringEvent',
    data() {
        return {
            range: {
                start: '',
                end: ''
            },
        }
    },
    components: {
        VenuAddress,
        EventDateFormat,
        DateRangePicker,
        Loader
    },

    setup() {
        const router = useRouter();
        const store = useStore();
        const singleEventData = ref('')

        function singleEvent(evntData) {
            singleEventData.value = evntData
            console.log("kfhgkfgjkf", singleEventData.value)
        }

         function reSet() {
            return singleEventData.value = '';
        }

        const loaderStatus = computed(() => {
            return store.state.loadingStatus;
        });

        const recurringEvent = computed(() => {
            return store.state.recurringEvent;
        })
        return {
            singleEvent,
            recurringEvent,
            loaderStatus,
            singleEventData,
            reSet
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
