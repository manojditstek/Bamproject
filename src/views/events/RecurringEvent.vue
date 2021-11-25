<template>
  <div v-if="singleEventData == ''">
    <div class="d-flex justify-content-between align-items-end header">
      <h1>
        <a href="javascript:void(0)" @click="backToHome">
          <i class="fa fa-angle-left" aria-hidden="true"></i>
          {{ recurringEvent ? lengthOfString(recurringEvent.name) : "" }}
        </a>
      </h1>
      <div class="datePicker">
        <div class="datePicker">
          <DateRangePicker
            v-model="date.range"
            :disabled="recurringEvent ? recurringEvent.length < 1 : ''"
          />
        </div>
      </div>
    </div>
    <div class="innerWraper">
      <div class="cardWrapper d-flex">
        <div class="dateCol">
          <h2>{{ recurringEvent ? recurringEvent.occurrence.length : "" }}</h2>
          <h4>{{ $t("common.events") }}</h4>
        </div>
        <div class="detailsCol">
          <small>
            {{ dateFormat(recurringEvent ? recurringEvent.startAt : "") }} -
            {{ dateFormat(recurringEvent ? recurringEvent.endAt : "") }}
          </small>
          <h2>{{ recurringEvent ? recurringEvent.name : "" }}</h2>
          <VenuAddress
            :venue_id="recurringEvent ? recurringEvent.venueId : ''"
          />
        </div>
      </div>
    </div>
    <div class="cardBodyWrapper">
      <div
        class="cardWrapper d-flex"
        @click="singleEvent(event)"
        v-for="event in recurringEvent ? recurringEvent.occurrence : ''"
        :key="event.id"
      >
        <div class="dateCol">
          <EventDateFormat :eventDate="event ? event.startAt : ''" />
        </div>
        <div class="detailsCol">
          <h2>{{ recurringEvent ? recurringEvent.name : "" }}</h2>
          <VenuAddress :venue_id="event ? event.venueId : ''" />
          <div class="priceWrap">
            <small>{{ $t("common.from") }}</small>
            <h5>{{ minPrice(event) }} {{ currency ? currency : "EUR" }}</h5>
          </div>
        </div>
        <div class="collapseArrow">
          <i class="fa fa-angle-right"></i>
        </div>
      </div>
    </div>
    <div class="singleTicketTotalAmount " v-if="totalQuantity">
        <CartCalculation />
    </div>
  </div>
  <!-- for occurrences -->
  <div v-else>
    <div class="d-flex justify-content-between align-items-end header">
      <h1>
        <a href="javascript:void(0)" @click="reSet">
          <i class="fa fa-angle-left" aria-hidden="true"></i>
          {{ recurringEvent ? lengthOfString(recurringEvent.name) : "" }}
        </a>
      </h1>
    </div>

    <div class="innerWraper">
      <div class="cardWrapper d-flex">
        <div class="dateCol" v-if="singleEventData == ''">
          <h2>{{ recurringEvent ? recurringEvent.occurrence.length : "" }}</h2>
          <h4>{{ $t("common.event") }}</h4>
        </div>
        <div class="dateCol" v-else>
          <EventDateWithoutTime
            :eventDate="singleEventData ? singleEventData.startAt : ''"
          />
        </div>
        <div class="detailsCol">
          <h2>{{ recurringEvent ? recurringEvent.name : "" }}</h2>
          <VenuAddress
            :venue_id="recurringEvent ? recurringEvent.venueId : ''"
          />
        </div>
      </div>
    </div>
    <div class="cardBodyWrapper">
      <Tickets
        :ticket="ticket"
        :venueId="recurringEvent.venueId"
        :startDate="singleEventData.startAt"
        :endDate="singleEventData.endAt"
        :ticketDscount="recurringEvent.ticketDiscount"
        :eventName="recurringEvent.name"
        v-for="ticket in singleEventData ? singleEventData.ticketConfig : ''"
        :key="ticket.id"
      />
    </div>
    <div class="singleTicketTotalAmount " v-if="totalQuantity">
        <CartCalculation />
    </div>
  </div>
  <!-- end occurrences -->
</template>

<script>
import { useRouter } from "vue-router"
import { useStore } from "vuex"
import { dateFormat, lengthOfString } from "../../common/common"
import { computed, ref, reactive } from "@vue/reactivity"
import VenuAddress from "../../components/singleEvent/venuAddress/VenueAddress"
import EventDateFormat from "../../components/singleEvent/EventDate"
import EventDateWithoutTime from '../../components/singleEvent/EventDateWithoutTime'
import DateRangePicker from "../../components/dateRangePicker/dateRangePicker"
import Tickets from "../../components/singleEvent/timeSlots/ticketList/Tickets"
import CartCalculation from "../ShoppingCart/CartCalculation"
export default{
  name: "RecurringEvent",
  components: {
    VenuAddress,
    EventDateFormat,
    DateRangePicker,
    Tickets,
    CartCalculation,
    EventDateWithoutTime
  },

  setup() {
    const router = useRouter();
    const store = useStore();
    const singleEventData = ref("");
    const currency = ref();
    const date = reactive({
      range: {
        start: "",
        end: "",
      }
    });
    function singleEvent(evntData) {
      singleEventData.value = evntData;
    }

    function reSet() {
      return (singleEventData.value = "");
    }

    const loaderStatus = computed(() => {
      return store.state.loadingStatus;
    });

    const recurringEvent = computed(() => {
      return store.state.recurringEvent;
    });

    const totalQuantity = computed(() => {
      return store.state.cart.itemsTotalQuantity;
    });

    function backToHome() {
      store.commit("backToHome");
      router.push({
        path: "/",
      });
    }

    // This method getting minimum price to display on event
    function minPrice(value) {
      if (value != "") {
        let temp = [];
        let minPrice = 0;
        value.ticketConfig.forEach((element) => {
          currency.value = element.currency;
          temp.push(element.faceValue);
          minPrice = temp.reduce(function (prev, curnt) {
            return prev < curnt ? prev : curnt;
          });
        });
        return minPrice.toFixed(2);
      }
    }

    return {
      singleEvent,
      recurringEvent,
      loaderStatus,
      singleEventData,
      reSet,
      totalQuantity,
      backToHome,
      lengthOfString,
      dateFormat,
      minPrice,
      currency,
      date
    }
  }
}
</script>
<style>
</style>
