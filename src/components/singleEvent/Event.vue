<template>
<!-- This block display single event  -->
<div @click="eventDetails(event.type,event.id)">
    <div class="cardWrapper d-flex" :class="event.type == 'recurring' ? 'recurring' : ''">
        <div class="dateCol" v-if="event.type == 'single'">
            <h4>{{ eventDate ? eventDate[0] : "" }}</h4>
            <h2>{{ eventDate ? eventDate[1] : "" }}</h2>
            <h4>
                {{ eventDate ? eventDate[2] : "" }}
                {{ eventDate ? eventDate[3] : "" }}
            </h4>
            <time>{{ eventDate ? eventDate[4] : "" }}
                {{ eventDate ? eventDate[5] : "" }}</time>
        </div>
        <div class="dateCol" v-if="event.type == 'recurring'">
            <h2>{{ event.occurrence.length }}</h2>
            <h4>Events</h4>
            <p class="from">from</p>
            <p>{{ recurringEventDate }}</p>
        </div>
        <div class="detailsCol">
            <h2>{{ event ? event.name : "" }}</h2>
            <VenuAddress :venue_id="event.venueId" />
            <div class="priceWrap">
                <p>from</p>
                0.00 EUR
            </div>
            <p>{{event.available_tickets}}</p>
        </div>
        <div class="collapseArrow">
            <img src="assets/images/white-icon.svg" width="8" alt="image" />
        </div>
    </div>
    <div v-show="showTicket" class="singleEventWrap">
        <TimeSlot :timeSlot="timeSlot" v-for="timeSlot in event ? event.timeslot : ''" :key="timeSlot.id" />
        <Tickets :ticket="ticket" :eventName="event.name" v-for="ticket in event ? event.ticketConfig: ''" :key="ticket.id" />
    </div>
</div>
<!-- end  -->
</template>

<script>
import moment from "moment";
import Tickets from "../singleEvent/timeSlots/ticketList/Tickets.vue";
import {
    useStore
} from "vuex";
import TimeSlot from "../singleEvent/timeSlots/TimeSlot.vue";
import VenuAddress from "../singleEvent/venuAddress/VenueAddress.vue"
import {
    ref,
    computed
} from "vue";
import {
    useRouter
} from "vue-router";
export default {
    name: "Event",
    props: {
        event: Object,
    },
    components: {
        Tickets,
        TimeSlot,
        VenuAddress,
        // TotalTicketCalculation,
    },
    setup(props) {
        const store = useStore();
        const router = useRouter();
        const eventCollection = ref(null);
        const eventDate = ref(null);
        const recurringEventDate = ref(null);
        const showTicket = ref(false);
        eventDate.value = moment(props.event.startAt)
            .format("ddd DD MMM YY HH:mm a")
            .split(" ");
        recurringEventDate.value = moment(props.event.startAt).format(
            "MM/DD/YYYY "
        );
        const totalPrice = computed(() => {
            return store.state.cart.itemTotalAmount;
        });
        const totalQuantity = computed(() => {
            return store.state.cart.itemsTotalQuantity;
        });

        function eventDetails(event, id) {
            if (event == "recurring") {
                store.dispatch('recurringEvent', id);
                router.push({
                    path: "/recurring-event"
                });
            } else {
                store.dispatch('getEvent', id);
                router.push({
                    path: "/single-event"
                });
            }
        }

        return {
            eventCollection,
            eventDate,
            showTicket,
            totalPrice,
            totalQuantity,
            eventDetails,
            recurringEventDate,
        };
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
