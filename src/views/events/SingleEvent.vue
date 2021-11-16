<template>
<div class="d-flex justify-content-between align-items-end header">
    <h2>
        <!-- <BackButton v-if="totalQuantity" :message="singleEvent?lengthOfString(singleEvent.name):''" /> -->
        <a href="javascript:void(0)" @click="backToHome">
            <i class="fa fa-angle-left" aria-hidden="true"></i>
            {{singleEvent?lengthOfString(singleEvent.name):''}}
        </a>
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
    <TimeSlot :timeSlot="timeSlot" :eventName="singleEvent.name" :event_id="singleEvent.id" :tickets="singleEvent?singleEvent:''" v-for="timeSlot in singleEvent ? singleEvent.timeslot : ''" :key="timeSlot.id" />
</div>
<div v-else class="cardBodyWrapper">
    <Tickets :ticket="ticket" :venueId="singleEvent.venueId" :startDate="singleEvent.startAt" :endDate="singleEvent.endAt"  :ticketDscount="singleEvent.ticketDiscount" :eventName="singleEvent.name" v-for="ticket in singleEvent ? singleEvent.ticketConfig : ''" :key="ticket.id" />
</div>

<div class="singleTicketTotalAmount d-flex" v-if="totalQuantity">
    <TotalTicketCalculation />
    <div class="labelBtn">
        <router-link to="/shop" class="button">{{$t('common.cart')}}</router-link>
    </div>
</div>
<!-- <div @click="chartResp">{{'ChartKey'}}</div> -->
<!-- <SeatsioChartManager
    :secretKey="workSpaceKey.workspaceKey"
    :chart="singleEvent.chartKey"
    :mode="singleEvent.rulesetKey"
    region="eu"
/> -->
</template>

<script>
import {useStore} from 'vuex';
import {dateFormat,timeFormat,lengthOfString} from "../../common/common";
import {computed} from '@vue/reactivity';
import {useRouter} from "vue-router";
import VenuAddress from "../../components/singleEvent/venuAddress/VenueAddress.vue"
import EventDateFormat from "../../components/singleEvent/EventDate.vue";
import Tickets from "../../components/singleEvent/timeSlots/ticketList/Tickets.vue"
import TotalTicketCalculation from "../../components/cartModule/TotalTicketCalculation.vue"
import TimeSlot from "../../components/singleEvent/timeSlots/TimeSlot.vue"
import {SeatsioClient,Region} from 'seatsio'

export default {
    name: 'SingleEvent',
    components: {
        VenuAddress,
        EventDateFormat,
        Tickets,
        TotalTicketCalculation,
        TimeSlot,
    },

    setup() {
        const store = useStore();
        const router = useRouter();
        // const chartList = ref();
        const loaderStatus = computed(() => {
            return store.state.loadingStatus;
        });

        const totalQuantity = computed(() => {
            return store.state.cart.itemsTotalQuantity;
        });

        const workSpaceKey = computed(() => {
            return store.state.workSpaceKey;
        });

        const singleEvent = computed(() => {
            store.dispatch('workSpaceKey');
            return store.state.event;
        })


        //seatsio testing
        
        async function chartResp() {
            let client = new SeatsioClient(Region.EU(), workSpaceKey.value.workspaceKey) // Here passing workspaceKey 
            await client.charts.listFirstPage();
        }


        function backToHome() {
            store.commit("backToHome");
            router.push({
                path: '/'
            })
        }
        return {
            singleEvent,
            totalQuantity,
            loaderStatus,
            chartResp,
            // chartList,
            backToHome,
            workSpaceKey,
            dateFormat,
            timeFormat,
            lengthOfString


        }
    },

    

}
</script>

