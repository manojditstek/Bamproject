<template>
  <div class="justify-content-between align-items-end header">
    <h1>
      <a href="javascript:void(0)" @click="backButton">
        <i class="fa fa-angle-left" aria-hidden="true"></i>
        {{ singleEvent ? lengthOfString(singleEvent.name) : "" }}
      </a>
    </h1>
  </div>
  <div class="innerWraper">
    <div class="cardWrapper d-flex">
      <div class="dateCol">
        <EventDateFormat :eventDate="singleEvent ? singleEvent.startAt : ''" />
      </div>
      <div class="detailsCol">
        <small>
          {{ timeFormat(timeSlot ? timeSlot.startAt : "") }} –
          {{ timeFormat(timeSlot ? timeSlot.endAt : "") }}
        </small>
        <h2>{{ singleEvent.name }}</h2>
        <VenuAddress :venue_id="singleEvent.venueId" />
      </div>
    </div>
  </div>
  <div class="cardBodyWrapper">
    <Tickets
      :ticket="ticket"
      :venueId="singleEvent.venueId"
      :startDate="singleEvent.startAt"
      :endDate="singleEvent.endAt"
      :ticketDscount="singleEvent.ticketDiscount"
      :timeSlotId="timeSlot ? timeSlot.id : ''"
      :eventName="singleEvent.name"
      v-for="ticket in singleEvent ? singleEvent.ticketConfig : ''"
      :key="ticket.id"
    />
  </div>
  <div class="singleTicketTotalAmount" v-if="totalQuantity">
       <CartCalculation />
  </div>
</template>
<script>
import { useStore } from "vuex";
import { dateFormat, timeFormat, lengthOfString } from "../../common/common";
import { computed } from "vue";
import { useRouter } from "vue-router";
import VenuAddress from "../../components/singleEvent/venuAddress/VenueAddress";
import EventDateFormat from "../../components/singleEvent/EventDateWithoutTime";
import Tickets from "../../components/singleEvent/timeSlots/ticketList/Tickets";
import CartCalculation from '../ShoppingCart/CartCalculation'
export default {
  name: "SingleEvent",
  components: {
    VenuAddress,
    EventDateFormat,
    Tickets,
    CartCalculation
  },

  setup() {
    const store = useStore();
    const router = useRouter();
    const timeSlot = computed(() => {
      return store.state.timeSlot;
    });

    const totalQuantity = computed(() => {
      return store.state.cart.itemsTotalQuantity;
    });

    function backButton() {
      router.push({
        path: "/single-event",
      });
    }

    const singleEvent = computed(() => {
      return store.state.event;
    });
    return {
      timeSlot,
      singleEvent,
      totalQuantity,
      timeFormat,
      dateFormat,
      lengthOfString,
      backButton,
    };
  },
};
</script>

<style></style>
