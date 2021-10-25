<template>
<div class="d-flex justify-content-between align-items-end header">
    <h2>

        <!-- <BackButton v-if="totalQuantity" :message="singleEvent?lengthOfString(singleEvent.name):''" /> -->
        <div @click="backToHome">
            <i class="fa fa-angle-left" aria-hidden="true"></i>
            {{singleEvent?lengthOfString(singleEvent.name):''}}
        </div>

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
            <VenuAddress :venue_id="singleEvent.venueId" />
        </div>
    </div>
</div>
<div class="cardBodyWrapper" v-if="singleEvent.timeslot?singleEvent.timeslot.length>0:''">
    <Loader />
    <TimeSlot :timeSlot="timeSlot" :eventName="singleEvent.name" :event_id="singleEvent.id" :tickets="singleEvent?singleEvent:''" v-for="timeSlot in singleEvent ? singleEvent.timeslot : ''" :key="timeSlot.id" />
</div>
<div v-else class="cardBodyWrapper">
    <Loader />
    <Tickets :ticket="ticket" :ticketDscount="singleEvent.ticketDiscount" :eventName="singleEvent.name" v-for="ticket in singleEvent ? singleEvent.ticketConfig : ''" :key="ticket.id" />
</div>

<div class="singleTicketTotalAmount d-flex" v-if="totalQuantity">
    <TotalTicketCalculation />
    <div class="labelBtn">
        <router-link to="/shop" class="button">Cart</router-link>
    </div>
</div>
<!-- <div @click="chartResp">{{'ChartKey'}}</div> -->
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
    computed,
    ref,watchEffect
} from '@vue/reactivity';
import {
    useRouter
} from "vue-router";
import VenuAddress from "../../components/singleEvent/venuAddress/VenueAddress.vue"
import EventDateFormat from "../../components/singleEvent/EventDate.vue";
import Tickets from "../../components/singleEvent/timeSlots/ticketList/Tickets.vue"
import TotalTicketCalculation from "../../components/cartModule/TotalTicketCalculation.vue"
import TimeSlot from "../../components/singleEvent/timeSlots/TimeSlot.vue"
import Loader from '../../components/loader/Loader.vue';
import {
    SeatsioClient,
    Region
} from 'seatsio'
import BackButton from '../../components/backButton/BackButton.vue'
export default {
    name: 'SingleEvent',
    components: {
        VenuAddress,
        EventDateFormat,
        Tickets,
        TotalTicketCalculation,
        TimeSlot,
        Loader,
        // BackButton
    },

    setup() {
        const store = useStore();
        const router = useRouter();
        const chartList = ref();
        const loaderStatus = computed(() => {
            return store.state.loadingStatus;
        });

        const totalQuantity = computed(() => {
            return store.state.cart.itemsTotalQuantity;
        });

    if(singleEvent){
        watchEffect(()=>{
        //    store.dispatch('workSpaceKey')
        })
    }
        const workSpaceKey = computed(() => {
            return store.state.workSpaceKey;
        });
        console.log("workSpaceKey", workSpaceKey)

        //seatsio testing
        let client = new SeatsioClient(Region.EU(), '')
        async function chartResp() {
            console.log("chartKey=>", singleEvent.value.chartKey)
            chartList.value = await client.charts.retrieve(singleEvent.value.chartKey);
            console.log("chartList=>", chartList.value)
        }

        console.log("hello", chartResp)

        function backToHome() {
            store.commit("backToHome");
            router.push({
                path: '/'
            })
        }

        const singleEvent = computed(() => {
             store.dispatch('workSpaceKey')
            return store.state.event;
        })
        return {
            singleEvent,
            totalQuantity,
            loaderStatus,
            chartResp,
            chartList,
            backToHome,
            workSpaceKey

        }
    },

    methods: {
        dateFormat(value) {
            return moment(value).format("MM/DD/YYYY ");
        },

        timeFormat(value) {
            return moment(value).format(" HH:mm a");
        },

        lengthOfString(value) {
            if (value ? value.length > 48 : '') {
                return value.substring(0, 48) + '...'
            } else {
                return value
            }
        }

    },

}
</script>

<style>

</style>
