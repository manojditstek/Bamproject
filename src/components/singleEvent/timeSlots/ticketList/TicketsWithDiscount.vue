<template>
<div class="cardWrapper d-flex" >
<div class="detailsCol">
    <h2>{{discount.name}}:{{discount.value}} {{'EUR'}}</h2>
    <div class="priceWrap d-flex">
        <div class="eventPrice1">
            <p>{{$t('common.fees')}} € 0.00</p>
            <p>{{$t('common.total')}} € 0.00</p>
        </div>
        <div class="ticketMessage">
            <div class="ticketMessageInner " :class="discount.availableTickets!='' ?'':'soldOut'">
                {{discount.availableTickets!='' ?'':'Sold Out'}}
            </div>
        </div>
        <!-- <div>{{perUserQuantity!=''?'Limit Exceeded!':''}}</div> -->
        <div class="buttonWrap d-flex" v-if="ticket.quantity>0">
            <button class="minusBtn" @click="removeFromCart()">-</button>
            <span class="dassedIcon">{{itemQuantity?itemQuantity:0}}</span>
            <button class="plusBtn" :class="ticket.quantity>=itemQuantity||ticket.availableTickets==''?'disabled':''" :disabled="ticket.quantity>=itemQuantity||ticket.availableTickets==''" @click="addToCart()">+</button>
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
               store.commit("addDiscountToCart", props.discount);
        }

        function removeFromCart() {
            store.commit("removeDiscountToCart", props.discount);

        }

        let discountTkt = computed(function(){
            let get_ticket= cart.value.map((element) => {
              get_ticket = element.discounts
            })
            return get_ticket;
        })

        let itemQuantity = computed(function () {
            let discountID = props.discount;
            let temp = null
            cart.value.forEach(element => {
                temp=element.discounts;
            });
            if(temp){
            let get_ticket= temp.filter((item) => item.id===discountID.id);
            return get_ticket[0]?.quantity;
            }
            return 0
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
            discountTkt

        }
    },

}
</script>

<style>
</style>
