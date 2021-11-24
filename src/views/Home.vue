<template>
  <div class="d-flex justify-content-between align-items-end header">
    <h2>{{ $t('common.events') }}</h2>
    <div class="datePicker">
      <DateRangePicker v-model="date.range" :disabled="events.length < 1" />
    </div>
  </div>
  <div class="cardBodyWrapper">
    <div v-if="events != ''">
      <Event :event="event" v-for="event in events" :key="event.id" />
    </div>
  </div>

  <div class="singleTicketTotalAmount d-flex" v-if="totalQuantity">
    <TotalTicketCalculation />
    <div class="labelBtn">
      <router-link to="/shop" class="button btnBlack">{{ $t('common.cart') }}</router-link>
    </div>
  </div>

  <div class="col-md-12">
    <div class="row">
      <div class="col-md-12 pt-5 footerActionBtn"></div>
    </div>
  </div>
</template>

<script>
import Event from "../components/singleEvent/Event.vue";
import TotalTicketCalculation from "../components/cartModule/TotalTicketCalculation.vue";
import DateRangePicker from "../components/dateRangePicker/dateRangePicker.vue";
import { computed, reactive, watchEffect } from "vue";
import { useStore } from "vuex";
export default {
  name: "Home",
  components: {
    Event,
    TotalTicketCalculation,
    DateRangePicker,
  },

  setup() {
    const store = useStore();
    const date = reactive({
      range: {
        start: "",
        end: "",
      },
    });

    const START_DATE = new Date();
    // START_DATE.setDate(START_DATE.getDate() + 10); used for future 10 days
    const events = computed(() => {
      return store.state.events
        //.filter((s) => new Date(s.startAt) >= START_DATE)
        //.sort((a, b) => new Date(a.startAt) - new Date(b.startAt)); //with filter date
    });
    
    const totalQuantity = computed(() => {
      return store.state.cart.itemsTotalQuantity;
    });

    const loaderStatus = computed(() => {
      return store.state.loadingStatus;
    });

    watchEffect(async () => {
      if (date.range.start != "" && date.range.end != "") {
        await store.dispatch("getEvents", date.range);
      } else {
        await store.dispatch("getEvents", "");
      }
    });
    return {
      events,
      totalQuantity,
      loaderStatus,
      date,
    };
  },
};
</script>
