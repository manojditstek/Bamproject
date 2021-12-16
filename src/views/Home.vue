<template>
  <div class="d-flex justify-content-between align-items-end header">
    <h1 v-if="event">{{ $t('common.event') }}</h1>
    <h1 v-else>{{ $t('common.events') }}</h1>
    <div class="datePicker" v-if="events.length>0">
      <DateRangePicker v-model="date.range" :disabled="events.length < 1" />
    </div>
    <!-- <div class="datePicker" v-else>
      <DateRangePicker v-model="date.range" :disabled="events.length < 1" />
    </div> -->
  </div>
  <div class="cardBodyWrapper">
    <div v-if="events.length>0">
      <Event :event="event" v-for="event in events" :key="event.id" />
    </div>
    <div v-else-if="event">
      <Event :event="event"  />
    </div>
  </div>

  <div class="singleTicketTotalAmount" v-if="totalQuantity">
      <CartCalculation />
  </div>

  <div class="col-md-12">
    <div class="row">
      <div class="col-md-12 pt-5 footerActionBtn"></div>
    </div>
  </div>
</template>

<script>
import Event from "../components/singleEvent/Event.vue";
import DateRangePicker from "../components/dateRangePicker/dateRangePicker.vue";
import { computed, reactive, watchEffect,ref, inject } from "vue";
import { useStore } from "vuex";
import CartCalculation from './ShoppingCart/CartCalculation'
export default {
  name: "Home",
  props:{
    event_id:Number
  },
  components: {
    Event,
    DateRangePicker,
    CartCalculation,
  },

  setup() {
    const store = useStore();
    const event = ref();
    const date = reactive({
      range: {
        start: "",
        end: "",
      },
    });

    const eventID = inject('eventID')
    // console.log('=>',eventID)

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
    
    watchEffect(async () => {
      if (date.range.start != "" && date.range.end != "") {
        await store.dispatch("getEvents", date.range);
      } 
      else if(eventID =='') {
        await store.dispatch("getEvents", "");
      }else{
      await store.dispatch("getCustomEvent");
      event.value=store.state.event;
      }
    });

    return {
      events,
      event,
      totalQuantity,
      date,
    };
  },
};
</script>
