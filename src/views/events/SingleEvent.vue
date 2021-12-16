<template>
<div class="justify-content-between align-items-end header">
    <h1>
        <a href="javascript:void(0)" @click="backToHome">
            <i class="fa fa-angle-left" aria-hidden="true"></i>
            {{singleEvent?lengthOfString(singleEvent.name):''}}
        </a>
    </h1>
</div>
<div class="innerWraper">
    <div class="cardWrapper d-flex">
        <div class="dateCol">
            <EventDateWithoutTime :eventDate="singleEvent?singleEvent.startAt:''" />
        </div>
        <div class="detailsCol">
            <small v-if="singleEvent.timeslot?singleEvent.timeslot.length>0:''">{{timeFormat(singleEvent?singleEvent.startAt:'')}} – {{timeFormat(singleEvent?singleEvent.endAt:'')}}</small>
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
<div class="singleTicketTotalAmount " v-if="totalQuantity">
    <CartCalculation />
</div>
</template>
<script>
import {useStore} from 'vuex'
import {dateFormat,timeFormat,lengthOfString,updateEvent} from "@/common/common"
import {computed,onUnmounted} from 'vue'
import {useRouter} from "vue-router"
import VenuAddress from "../../components/singleEvent/venuAddress/VenueAddress"
import EventDateWithoutTime from "../../components/singleEvent/EventDateWithoutTime"
import Tickets from "../../components/singleEvent/timeSlots/ticketList/Tickets"
import TimeSlot from "../../components/singleEvent/timeSlots/TimeSlot"
import CartCalculation from "../ShoppingCart/CartCalculation";
export default {
    name: 'SingleEvent',
    components: {
        VenuAddress,
        Tickets,
        TimeSlot,
        EventDateWithoutTime,
        CartCalculation
    },

    setup() {
        const store = useStore();
        const router = useRouter();
        const totalQuantity = computed(() => {
            return store.state.cart.itemsTotalQuantity;
        });       
        const singleEvent = computed(() => {
            return updateEvent(store.state.event);
        })
        onUnmounted(()=>{
            store.state.event
        })

        function backToHome() {
            store.commit("backToHome");
            router.push({
                path: '/'
            })
        }
        return {
            singleEvent,
            totalQuantity,
            backToHome,
            dateFormat,
            timeFormat,
            lengthOfString,
            updateEvent
        }
    },

    

}
</script>

