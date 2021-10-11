<template>
<div class="d-flex justify-content-between align-items-end header">
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
            <VenuAddress :venue_id="recurringEvent?recurringEvent.venue_id:''" />
        </div>
    </div>
</div>
<div class="cardBodyWrapper">
    <Loader />
    <div class="cardWrapper d-flex" @click="singleEvent(event.id)" v-for="event in recurringEvent?recurringEvent.occurrence:''" :key="event.id">
        <div class="dateCol">
            <EventDateFormat :eventDate="event?event.start_at:''" />
        </div>
        <div class="detailsCol">
            <h2>{{recurringEvent?recurringEvent.name:''}}</h2>
            <VenuAddress :venue_id="event?event.venue_id:''" />
            <div class="priceWrap">
                <p>from</p>0.00 EUR
            </div>
        </div>
        <div class="collapseArrow">
             <i class="fa fa-angle-right"></i>
        </div>
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
        // const startDate = ref();
        // const endDate = ref();

        function singleEvent(id) {
            store.dispatch('recurringEvent', id);
            router.push({
                path: '/single-event'
            })
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
            loaderStatus
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
