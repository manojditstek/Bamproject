<template>
<div v-if="singleEventData==''">
    <div class="d-flex justify-content-between align-items-end header">
        <h2>
            <!-- <router-link to="/">
            <i class="fa fa-angle-left" aria-hidden="true"></i>
            {{recurringEvent?recurringEvent.name:''}}
        </router-link> -->

            <BackButton v-if="totalQuantity" :message="recurringEvent?recurringEvent.name:''" />
            <div v-else @click="backToHome">
                <i class="fa fa-angle-left" aria-hidden="true"></i>
                {{recurringEvent?recurringEvent.name:''}}
            </div>
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
                <h2>{{recurringEvent?recurringEvent.name:''}}</h2>
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
            {{recurringEvent?recurringEvent.name:''}}
        </h2>
    </div>

    <div class="innerWraper">
        <div class="cardWrapper d-flex">
            <div class="dateCol" v-if="singleEventData==''">
                <h2>{{recurringEvent?recurringEvent.occurrence.length:''}}</h2>
                <h4>Event</h4>
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
    <div class="cardBodyWrapper">
        <Loader />
        <Tickets :ticket="ticket" :ticketDscount="recurringEvent.ticketDiscount" :eventName="recurringEvent.name" v-for="ticket in singleEventData ? singleEventData.ticketConfig : ''" :key="ticket.id" />
    </div>
    <div class="singleTicketTotalAmount d-flex" v-if="totalQuantity">
        <TotalTicketCalculation />
        <div class="labelBtn">
            <router-link to="/shop" class="button">Cart</router-link>
        </div>
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
import Tickets from '../../components/singleEvent/timeSlots/ticketList/Tickets.vue'
import TotalTicketCalculation from '../../components/cartModule/TotalTicketCalculation.vue'
import BackButton from '../../components/backButton/BackButton.vue'
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
        Loader,
        Tickets,
        TotalTicketCalculation,
        BackButton
    },

    setup() {
        const router = useRouter();
        const store = useStore();
        const singleEventData = ref('')

        function singleEvent(evntData) {
            singleEventData.value = evntData
        }

        function reSet() {
            //store.commit("backToHome");
            return singleEventData.value = '';
        }

        const loaderStatus = computed(() => {
            return store.state.loadingStatus;
        });

        const recurringEvent = computed(() => {
            return store.state.recurringEvent;
        })

        const totalQuantity = computed(() => {
            return store.state.cart.itemsTotalQuantity;
        });

        function backToHome() {
            router.push({
                path: '/'
            })
        }

        return {
            singleEvent,
            recurringEvent,
            loaderStatus,
            singleEventData,
            reSet,
            totalQuantity,
            backToHome
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
