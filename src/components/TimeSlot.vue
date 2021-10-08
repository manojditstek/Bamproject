<template>
<!-- <div class="cardWrapper d-flex" @click="timeSlot()">
    <div class="timeSlots  d-flex" :class="toggleButton?'active':''" @click="toggleButton=!toggleButton">
        <div class="detailsCol">
            <h2>{{timeFormat(timeSlot.start_at)}} – {{timeFormat(timeSlot.end_at)}}</h2>
        </div>
        <div class="collapseArrow lightBg">
            <img src="../assets/images/white-icon.svg" width="8" alt="image">
        </div>
    </div>
    <div class="ticketToggle active" v-show="toggleButton">
    </div>
</div> -->

<div class="cardWrapper d-flex" :class="toggleButton?'active':''" @click="toggleButton=!toggleButton">
    <div class="detailsCol">
        <h2>{{timeFormat(timeSlot.start_at)}} – {{timeFormat(timeSlot.end_at)}}</h2>
    </div>
    <div class="collapseArrow">
        <img src="/img/white-icon.svg" width="8" alt="image" />
    </div>
</div>
<div class=" active" v-show="toggleButton">
    <!-- <Tickets :ticket="ticket"/> -->
</div>

</template>

<script>
import moment from "moment"
import {
    ref
} from 'vue'
import Tickets from './Tickets.vue'
export default {
  components: { 
    //   Tickets 
      },
    name: 'TimeSlot',
    props: {
        timeSlot: Object,
        ticket: String
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
