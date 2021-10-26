<template>
<div class="cardWrapper d-flex" >
<div class="detailsCol">
    <h2>{{discount.name}}:{{discount.value}} {{'EUR'}}</h2>
    <div class="priceWrap d-flex">
        <div class="eventPrice1">
            <p>Fees: € 0.00</p>
            <p>Total: € 0.00</p>
        </div>
        <div class="ticketMessage">
            <div class="ticketMessageInner " :class="discount.availableTickets!='' ?'':'soldOut'">
                {{discount.availableTickets!='' ?'':'Sold Out'}}
            </div>
        </div>
        <div>{{perUserQuantity!=''?'Limit Exceeded!':''}}</div>
        <div class="buttonWrap d-flex">
            <button class="minusBtn" @click="removeFromCart()">-</button>
            <span class="dassedIcon">{{itemQuantity?itemQuantity:0}}</span>
            <button class="plusBtn" :class="perUserQuantity!=''||discount.availableTickets==''?'disabled':''" :disabled="perUserQuantity!=''||discount.availableTickets==''" @click="addToCart()">+</button>
        </div>
    </div>
</div>
</div>
</template>

<script>
import {
    ref,
    computed
} from 'vue'
import {
    useStore
} from "vuex";
export default {
    name: 'TicketsWithDiscount',
    components: {},
    props: {
        ticket: Object,
        eventName: String,
        timeSlotId: String,
        discount: Object,
        eventChartKey: String
    },

    setup(props) {
        const toggleButton = ref(false);
        const discountTicket = ref()
        const store = useStore();
        let cart = computed(function () {
            return store.state.cart.cartItems
        });

        function addToCart() {
            let ticket = {
                item: props.ticket,
                ticketDiscount:props.discount.value,
                eventName: props.eventName,
                timeslot_id: props.timeSlotId

            };

            store.commit("addCartItem", ticket);
        }

        function removeFromCart() {
            store.commit("removeCartItem", props.ticket);

        }
        let itemQuantity = computed(function () {
            let ticket = props.ticket;
            let get_ticket = cart.value.filter((item) => item.id == ticket.id);
            return get_ticket[0] ?.quantity;
        })

        let perUserQuantity = computed(function () {
             let ticket = props.ticket;
            let perUser = cart.value.filter((item) => item.quantity == ticket.ticketsPerUser && item.id == ticket.id);
            return perUser;
        })

        return {
            toggleButton,
            itemQuantity,
            addToCart,
            removeFromCart,
            perUserQuantity,
            discountTicket,

        }
    },

}
</script>

<style>
</style>
