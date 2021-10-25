<template>
<div class="ticketToggle ">
    <Loader />
    <div class="cardWrapper d-flex"  v-if="ticketDscount?ticketDscount.length==0:''" >
        <div class="detailsCol">
            <h2>{{ticket?ticket.name:'Ticket Not Found!'}} : 0.00 - {{ticket?(ticket.faceValue).toFixed(2):'0.00'}} {{ticket?ticket.currency:'EUR'}}</h2>
            <p>incl. fees:€ 0.00 </p>
        </div>
        <div class="ticketMessage">
            <div class="ticketMessageInner " :class="ticket.availableTickets!='' ?'':'soldOut'">
                {{ticket.availableTickets!='' ?'':'Sold Out'}}
            </div>
        </div>
        <div class="limitExceeded">
            <div class="limitExceededInner">
            {{perUserQuantity!=''?'Per User Limit Exceeded!':''}}
            </div>
        </div>
        <div class="buttonWrap d-flex">
            <button class="minusBtn" @click="removeFromCart()">-</button>
            <span class="dassedIcon">{{itemQuantity?itemQuantity:0}}</span>
            <button class="plusBtn" :class="perUserQuantity!=''||ticket.availableTickets==''?'disabled':''" :disabled="perUserQuantity!=''||ticket.availableTickets==''" @click="addToCart()">+</button>
        </div>
        <div class="collapseArrow lightBg" >   
        </div>
    </div>

    <div v-else>
    <div class="cardWrapper d-flex" :class="toggleButton?'active':''" @click="toggleButton=!toggleButton">
        <div class="detailsCol">
            <h2>{{ticket?ticket.name:'Ticket Not Found!'}} : 0.00 - {{ticket?(ticket.faceValue).toFixed(2):'0.00'}} {{ticket?ticket.currency:'EUR'}}</h2>
            <p>incl. fees:€ 0.00 </p>
        </div>
        <div class="ticketMessage">
            <div class="ticketMessageInner " :class="ticket.availableTickets!='' ?'':'soldOut'">
                {{ticket.availableTickets!='' ?'':'Sold Out'}}
            </div>
        </div>
        <p>{{perUserQuantity!=''?'Per User Limit Exceeded!':''}}</p>
        <div class="buttonWrap d-flex">
            <button class="minusBtn" @click="removeFromCart()">-</button>
            <span class="dassedIcon">{{itemQuantity?itemQuantity:0}}</span>
            <button class="plusBtn" :class="perUserQuantity!=''||ticket.availableTickets==''?'disabled':''" :disabled="perUserQuantity!=''||ticket.availableTickets==''" @click="addToCart()">+</button>
        </div>
        <div class="collapseArrow lightBg" >
            <i class="fa fa-angle-right"></i>
        </div>
    </div>
    <div  v-if="ticketDscount?ticketDscount.length>0:''" v-show="toggleButton" class="toggleList">
        <div v-if="ticketDscount?ticketDscount.length>0:''">
            <TicketsWithDiscount :discount="discount" v-for="discount in ticketDscount" :key="discount.id"/>
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
import Loader from '../../../loader/Loader'
import TicketsWithDiscount from '../ticketList/TicketsWithDiscount'
export default {
    name: 'Tickets',
    components: {
        Loader,
        TicketsWithDiscount
    },
    props: {
        ticket: Object,
        eventName: String,
        timeSlotId: Number,
        ticketDscount: Object,
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
