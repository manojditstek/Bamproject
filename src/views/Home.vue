<template>
<div class="d-flex justify-content-between align-items-end header">
    <h2>Events</h2>
    <div class="datePicker">
        <DateRangePicker v-model="date.range" :disabled="events.length<1" />
    </div>
</div>
<div class="cardBodyWrapper">
    <Loader />
    <div v-if="events!=''">
        <Event :event="event" v-for="event in events" :key="event.id" />
    </div>
    <!-- <div v-else>
        <Event :event="event" />
    </div> -->
</div>

<div class="singleTicketTotalAmount d-flex" v-if="totalQuantity">
    <TotalTicketCalculation />
    <div class="labelBtn">
        <router-link to="/shop" class="button">Cart</router-link>
    </div>
</div>

<div class="col-md-12">
    <div class="row">
        <div class="col-md-12 pt-5 footerActionBtn">
        </div>
    </div>
</div>
<div>
</div>
</template>

<script>
import Event from '../components/singleEvent/Event.vue'
import TotalTicketCalculation from '../components/cartModule/TotalTicketCalculation.vue'
import DateRangePicker from '../components/dateRangePicker/dateRangePicker.vue'
// import moment from "moment"
import {BAM} from 'bam-ticketing-sdk'
import Loader  from '../components/loader/Loader.vue'
import {
    ref,
    computed,
    reactive,
    watchEffect,
    onMounted
} from "vue";
import {
    useStore
} from "vuex";
export default {
    name: "Home",
    components: {
        Event,
        TotalTicketCalculation,
        DateRangePicker,
        Loader
    },

    setup() {
        const store = useStore();
        // const events = ref();
        const date = reactive({
            range: {
                start: '',
                end: '',
            }
        })

        const events = computed(() => {
            return store.state.events
        });

        // const bam = new BAM("https://develop.bam.fan")
        // onMounted(async () => {
        //     events.value = await bam.event
        //         .listEvents({
        //             with: {
        //                 ticket_config: true,
        //                 occurrence: true
        //             }
        //         });
        //     // const events = await bam.event.getEvent({ id: 3163 });
        //     console.log("events: ", events.value);
        // });

        const totalQuantity = computed(() => {
            return store.state.cart.itemsTotalQuantity;
        });

        // const event = computed(() => {
        //     return store.state.event;
        // });

        const loaderStatus = computed(() => {
            return store.state.loadingStatus;
        });

        watchEffect(async() => {
            if(date.range.start!='' && date.range.end!=''){
                await store.dispatch('getEvents', date.range);
            }else{
                await store.dispatch('getEvents', '');
            }
        });

        // onMounted(async() => {
        //     await store.dispatch('getEvent');
        // })
        return {
            events,
            totalQuantity,
            loaderStatus,
            date,

        };

    },

};
</script>
