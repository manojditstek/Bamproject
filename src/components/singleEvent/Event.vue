<template>
<!-- This block display single event  -->
<div @click="eventDetails(event.type,event.id,event.kycLevelId)">
    <div class="cardWrapper d-flex" :class="event.type == 'recurring' ? 'recurring' : ''">
        <div class="dateCol" v-if="event.type == 'single'">
            <h4>{{ eventDate ? eventDate[0] : "" }}</h4>
            <h2>{{ eventDate ? eventDate[1] : "" }}</h2>
            <h4>
                {{ eventDate ? eventDate[2] : "" }}
                {{ eventDate ? eventDate[3] : "" }}
            </h4>
            <time>{{ eventDate ? eventDate[4] : "" }}
                {{ eventDate ? eventDate[5] : "" }}
            </time>
        </div>
        <!-- <div class="dateCol" v-if="event.timeslot.length>0?event.timeslot:''">
            <h2>{{ event.occurrence.length }}</h2>
            <h4>{{$t('common.events')}}</h4>
            <p>{{ recurringEventDate }}</p>
            <p>fddf</p>
        </div> -->
        <div class="dateCol" v-if="event.type == 'recurring'">
            <h2>{{ event.occurrence.length }}</h2>
            <h4>{{$t('common.events')}}</h4>
            <small>from</small>
            <small>{{ recurringEventDate }}</small>
        </div>
        <div class="detailsCol"> 
            <h2>{{ event ? event.name : "" }}</h2>
            <VenuAddress :venue_id="event.venueId" />
            <div class="priceWrap">
                <small>{{$t('common.from')}}</small>
                <h6>{{minPrice?(minPrice).toFixed(2):'0.00'}} {{currency?currency:'EUR'}}</h6>
            </div>
        </div>
        <div class="collapseArrow">
            <img src="assets/images/white-icon.svg" width="8" alt="image" />
        </div>
    </div>
    <div v-show="showTicket" class="singleEventWrap">
        <TimeSlot :timeSlot="timeSlot" v-for="timeSlot in event ? event.timeslot : ''" :key="timeSlot.id" />
        <Tickets :ticket="ticket" :eventName="event.name" :venueId="event.venueId" v-for="ticket in event ? event.ticketConfig: ''" :key="ticket.id" />
    </div>
</div>
<!-- end  -->
</template>

<script>
import moment from "moment";
import Tickets from "../singleEvent/timeSlots/ticketList/Tickets.vue";
import {useStore} from "vuex";
import TimeSlot from "../singleEvent/timeSlots/TimeSlot.vue";
import VenuAddress from "../singleEvent/venuAddress/VenueAddress.vue"
import {ref,computed} from "vue";
import {useRouter} from "vue-router";
export default {
    name: "Event",
    props: {
        event: Object,
    },
    components: {
        Tickets,
        TimeSlot,
        VenuAddress,
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

        
        // This method getting minimum price to display on event
        let minPrice = 0;
        let currency =null;
        if(props.event.ticketConfig!=''){
            let temp=[]
            props.event.ticketConfig.forEach((item)=> {  
                currency=item.currency;
                temp.push(item.faceValue); 
                minPrice = temp.reduce(function (prev, curnt) {
                    return prev < curnt ? prev : curnt;
                });
            });

        }
        
        
        

        function eventDetails(event, id,kycStatus) {
            if (event == "recurring") {
                store.dispatch('recurringEvent', id);
                store.commit('kycStatusLevel',kycStatus)
                router.push({
                    path: "/recurring-event"
                });
            } else {
                store.dispatch('getEvent', id);
                store.commit('kycStatusLevel',kycStatus)
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
            minPrice,
            currency
        };
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
