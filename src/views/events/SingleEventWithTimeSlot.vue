<template>
<div class="d-flex justify-content-between align-items-end header">
    <h2>
        <a href="javascript:void(0)"  @click="backButton">
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
            <p>{{timeFormat(timeSlot?timeSlot.startAt:'')}} – {{timeFormat(timeSlot?timeSlot.endAt:'')}}</p>
            <h2>{{singleEvent.name}}</h2>
            <VenuAddress :venue_id="singleEvent.venueId" />
        </div>
    </div>
</div>
<div  class="cardBodyWrapper">
    <!-- <Loader /> -->
    <Tickets :ticket="ticket" :venueId="singleEvent.venueId" :startDate="singleEvent.startAt" :endDate="singleEvent.endAt" :ticketDscount="singleEvent.ticketDiscount"  :timeSlotId="timeSlot?timeSlot.id:''" :eventName="singleEvent.name" v-for="ticket in singleEvent ? singleEvent.ticketConfig : ''" :key="ticket.id" />
</div>

<div class="singleTicketTotalAmount d-flex" v-if="totalQuantity">
    <TotalTicketCalculation />
    <div class="labelBtn">
        <router-link to="/shop" class="button">{{$t('common.cart')}}</router-link>
    </div>
</div>
</template>

<script>
import {useStore} from 'vuex';
import moment from "moment";
import {computed} from '@vue/reactivity';
import {useRouter} from "vue-router";
import VenuAddress from "../../components/singleEvent/venuAddress/VenueAddress.vue"
import EventDateFormat from "../../components/singleEvent/EventDate.vue";
import Tickets from "../../components/singleEvent/timeSlots/ticketList/Tickets.vue"
import TotalTicketCalculation from "../../components/cartModule/TotalTicketCalculation.vue"
export default {
    name: 'SingleEvent',
    components: {
        VenuAddress,
        EventDateFormat,
        Tickets,
        TotalTicketCalculation,
    },

    setup() {
        const store = useStore();
        const router = useRouter();
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
        
        function backButton(){
            // store.commit("backToHome");
            router.push({
                path: '/single-event'
            })
        }

        function lengthOfString(value){
            if(value?value.length>48:''){
                return value.substring(0,35)+ '...'
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
            lengthOfString,
            backButton
            //startDate,
            //endDate

        }
    },

  

}
</script>

<style>

</style>
