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
        <p>{{perUserQuantity!=''?'Per User Limit Exceeded!':''}}</p>
        <div class="buttonWrap d-flex">
            <button class="minusBtn" @click="removeFromCart(discount)">-</button>
            <span class="dassedIcon">{{itemQuantity?itemQuantity:0}}</span>
            <button class="plusBtn" :class="perUserQuantity!=''||discount.availableTickets==''?'disabled':''" :disabled="perUserQuantity!=''||discount.availableTickets==''" @click="addToCart(discount)">+</button>
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
                item: props.discount,
                eventName: props.eventName,
                timeslot_id: props.timeSlotId

            };

            store.commit("addCartItem", ticket);
        }

        function removeFromCart() {
            store.commit("removeCartItem", props.discount);

        }
        let itemQuantity = computed(function () {
            let discount = props.discount;
            let get_ticket = cart.value.filter((item) => item.id == discount.id);
            return get_ticket[0] ?.quantity;
        })

        let perUserQuantity = computed(function () {
            let discount = props.discount;
            let perUser = cart.value.filter((item) => item.quantity == discount.ticketsPerUser);
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
