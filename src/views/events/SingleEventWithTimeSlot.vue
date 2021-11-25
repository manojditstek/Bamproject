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
<div class="cardBodyWrapper">
    <Tickets :ticket="ticket" :venueId="singleEvent.venueId" :startDate="singleEvent.startAt" :endDate="singleEvent.endAt" :ticketDscount="singleEvent.ticketDiscount"  :timeSlotId="timeSlot?timeSlot.id:''" :eventName="singleEvent.name" v-for="ticket in singleEvent ? singleEvent.ticketConfig : ''" :key="ticket.id" />
</div>
<div class="singleTicketTotalAmount d-flex" v-if="totalQuantity">
    <TotalTicketCalculation />
        <CartButton />
</div>
</template>
<script>
import {useStore} from 'vuex'
import {dateFormat,timeFormat,lengthOfString} from "../../common/common"
import {computed} from 'vue'
import {useRouter} from "vue-router"
import VenuAddress from "../../components/singleEvent/venuAddress/VenueAddress"
import EventDateFormat from "../../components/singleEvent/TimeSlotEventDate"
import Tickets from "../../components/singleEvent/timeSlots/ticketList/Tickets"
import TotalTicketCalculation from "../../components/cartModule/TotalTicketCalculation"
import CartButton from "../../components/cartModule/CartButton"
export default {
    name: 'SingleEvent',
    components: {
        VenuAddress,
        EventDateFormat,
        Tickets,
        TotalTicketCalculation,
        CartButton
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

        function backButton(){
            router.push({
                path: '/single-event'
            })
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
           

        }
    },

  

}
</script>

<style>

</style>
