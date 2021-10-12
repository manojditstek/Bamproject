<template>
<div class="cardWrapper d-flex" :class="toggleButton?'active':''" @click="toggleButton=!toggleButton">
    <div class="detailsCol">
        <h2>{{timeFormat(timeSlot.startAt)}} – {{timeFormat(timeSlot.endAt)}}</h2>
        <h6></h6>
    </div>
    <div class="collapseArrow">
         <i class="fa fa-angle-right"></i>
    </div>
</div>
<div class=" active" v-show="toggleButton">
    <div v-if="tickets.ticketConfig" >
        <Tickets :ticket="ticket" :eventName="eventName" v-for="ticket in tickets.ticketConfig" :key="ticket.id" />
    </div>
    
</div>

</template>

<script>
import moment from "moment"
import {
    ref
} from 'vue'
import Tickets from '../timeSlots/ticketList/Tickets.vue'
export default {
  components: { 
      Tickets 
      },
    name: 'TimeSlot',
    props: {
        timeSlot: Object,
        tickets: Array,
        eventName:String
    },
    setup() {
        const toggleButton = ref(false)
        return {
            toggleButton
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
