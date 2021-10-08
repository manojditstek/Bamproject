<template>
<div class="d-flex justify-content-between align-items-end header">
    <h2>Events</h2>
    <div class="datePicker">
        <!-- <input type="date" v-model="startDate" placeholder="Pick a date" :disabled="datePickerCheck"> - 
         <input type="date" v-model="endDate" placeholder="Pick a date" :disabled="datePickerCheck"> -->
        <date-picker v-model="range" is-range class="datePickerWrapper">
            <template v-slot="{ inputValue, inputEvents }">
                <div class="d-flex justify-center items-center ">
                    <div class="d-flex datePicker">
                        <input :disabled="events.length<1" :value="inputValue.start" class="border px-2 py-1 w-32 rounded focus:outline-none focus:border-indigo-300" />
                        -
                        <input :disabled="events.length<1" :value="inputValue.end" class="border px-2 py-1 w-32 rounded focus:outline-none focus:border-indigo-300" />
                        <img src="@/assets/images/date_icon.svg" alt="Image" v-on="inputEvents.end">
                    </div>

                </div>
            </template>
        </date-picker>
    </div>
</div>

<div class="cardBodyWrapper">
    <div v-if="loaderStatus" class="loader">
        <div class="loaderWrapper">
            <img src="@/assets/images/loading-buffering.gif" alt="Image">
        </div>
    </div>
    <div v-if="events!=''">
        <Event :event="event" v-for="event in events" :key="event.id" />
    </div>
    <div v-else>
        <Event :event="event" />
    </div>
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
            <!-- <router-link to="/shop" class="btn btn-primary btn-block button" >Next</router-link> -->
            <!-- <Cart /> -->
        </div>
    </div>
</div>
<div>
</div>
</template>

<script>
// @ is an alias to /src
//import DataService from "../services/DataService";
import Event from "@/components/Event.vue";
// import Cart from "../components/Cart.vue";
//import Tickets from "@/components/Tickets.vue";
import TotalTicketCalculation from "../components/TotalTicketCalculation.vue"
import {
    DatePicker
} from 'v-calendar';
import {
    ref,
    computed,
    onMounted,
} from "vue";
import {
    useStore
} from "vuex";
// import moment from 'moment'
export default {
    name: "Home",

    data() {
        return {
            range: {
                start: new Date(),
                end: new Date(2022, 0, 5)
            },
        }
    },

    components: {
        Event,
        // Product,
        // Cart,
        TotalTicketCalculation,
        DatePicker
    },

    setup() {
        const store = useStore();
        const datePickerCheck = ref(null);
        const startDate = ref(new Date().toISOString().slice(0, 10));
        const endDate = ref(new Date().toISOString().slice(0, 10));

        const events = computed(() => {
            return store.state.events
        });

        const totalQuantity = computed(() => {
            return store.state.cart.itemsTotalQuantity;
        });

        const event = computed(() => {
            return store.state.event;
        });

        const loaderStatus = computed(() => {
            return store.state.loadingStatus;
        });

        onMounted(() => {
            store.dispatch('getEvents', startDate.value);
        });

        onMounted(() => {
            store.dispatch('getEvent');
        })

        return {
            events,
            event,
            startDate,
            endDate,
            datePickerCheck,
            totalQuantity,
            loaderStatus

        };

    },

};
</script>
