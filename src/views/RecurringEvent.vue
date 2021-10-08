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
            <!-- <input type="date" v-model="startDate" placeholder="Pick a date" :disabled="datePickerCheck"> - 
         <input type="date" v-model="endDate" placeholder="Pick a date" :disabled="datePickerCheck"> -->
            <date-picker v-model="range" is-range class="datePickerWrapper">
                <template v-slot="{ inputValue, inputEvents }">
                    <div class="d-flex justify-center items-center ">
                        <div class="d-flex datePicker">
                            <input :value="inputValue.start"  class="border px-2 py-1 w-32 rounded focus:outline-none focus:border-indigo-300" />
                            -
                            <input :value="inputValue.end"  class="border px-2 py-1 w-32 rounded focus:outline-none focus:border-indigo-300" />
                            <img src="@/assets/images/date_icon.svg" alt="Image" v-on="inputEvents.end">
                        </div>
                        
                    </div>
                </template>
            </date-picker>
        </div>
    </div>
</div>

<div class="innerWraper">
    <div class="cardWrapper d-flex">
        <div class="dateCol">
            <!-- <h4>Tue</h4> -->
            <h2>{{recurringEvent?recurringEvent.occurrence.length:''}}</h2>
            <h4>Events</h4>
            <!-- <time>15:30 pm</time> -->
        </div>
        <div class="detailsCol">
            <p>{{dateFormat(recurringEvent?recurringEvent.start_at:'')}} - {{dateFormat(recurringEvent?recurringEvent.end_at:'')}}</p>
            <h2>{{recurringEvent?recurringEvent.name:''}}</h2>
            <VenuAddress :venue_id="recurringEvent?recurringEvent.venue_id:''" />
        </div>
    </div>
</div>
<div class="cardBodyWrapper">
    <div v-if="loaderStatus" class="loader">
        <div class="loaderWrapper">
            <img src="@/assets/images/loading-buffering.gif" alt="Image">
        </div>
    </div>
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
            <img src="/img/white-icon.svg" width="8" alt="image" />
        </div>
    </div>

</div>
</template>

<script>
import {
    useRouter
} from "vue-router";
import {
    DatePicker
} from 'v-calendar';
import {
    useStore
} from 'vuex';
// import {  ref} from "vue";
import moment from "moment";
import {
    computed
} from '@vue/reactivity';
import VenuAddress from "../components/VenueAddress.vue"
import EventDateFormat from "../components/EventDate.vue";
export default {
    name: 'RecurringEvent',
    data() {
        return {
            range: {
                start: new Date(),
                end: new Date(2022, 0, 5)
            },
        }
    },
    components: {
        DatePicker,
        VenuAddress,
        EventDateFormat
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
