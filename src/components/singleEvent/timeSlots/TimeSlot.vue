<template>
<div class="cardWrapper d-flex" :class="toggleButton?'active':''" @click="toggleButton=!toggleButton" >
    <div class="detailsCol" @click="timeSlots(event_id,timeSlot)">
        <h2>{{timeFormat(timeSlot.startAt)}} – {{timeFormat(timeSlot.endAt)}}</h2>
        <h6></h6>
    </div>
    <div class="collapseArrow">
         <i class="fa fa-angle-right"></i>
    </div>
</div>
<div class=" active" v-show="toggleButton">
    <div v-if="tickets.ticketConfig" >
        <Tickets :ticket="ticket" :eventName="eventName" :timeSlotId="timeSlot.id" v-for="ticket in tickets.ticketConfig" :key="ticket.id" />
    </div>
    
</div>

</template>

<script>
import moment from "moment"
import {
    ref
} from 'vue'
import {
    useRouter
} from "vue-router";
import {
    useStore
} from "vuex";
import Tickets from '../timeSlots/ticketList/Tickets.vue'

export default {
  components: { 
      Tickets 
      },
    name: 'TimeSlot',
    props: {
        timeSlot: Object,
        tickets: Array,
        eventName:String,
        event_id:String
    },
    setup() {
        const toggleButton = ref(false)
        const router = useRouter();
        const store = useStore();

        function timeSlots(event_id,timeSlot) {
            store.dispatch('sigleEventWithTimeSlot',{event_id,timeSlot});
            router.push({
                path: '/single-event-with-time-slots'
            })
        }
        return {
            toggleButton,
            timeSlots,
            router
        }
    },
    methods: {
        timeFormat(value) {
            return moment(value).format(" HH:mm a");
        }
    },
}
</script>

<style>

</style>
