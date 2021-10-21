<template>
<div class="ticketToggle ">
    <Loader />
    <div class="cardWrapper d-flex" :class="toggleButton?'active':''" @click="toggleButton=!toggleButton">
        <div class="detailsCol">
            <h2>{{ticket?ticket.name:'Ticket Not Found!'}} : 0.00 - {{ticket?(ticket.faceValue).toFixed(2):'0.00'}} {{ticket?ticket.currency:'EUR'}}</h2>
            <p>incl. fees:</p>
        </div>
         <div class="ticketMessage"><div class="ticketMessageInner " :class="ticket.availableTickets!='' ?'available':'soldOut'">
             {{ticket.availableTickets!='' ?'Available':'Sold Out'}}
        </div></div>
        <div class="collapseArrow lightBg">
            <i class="fa fa-angle-right"></i>
        </div>
    </div>
    <div v-show="toggleButton" class="toggleList">
        <div v-if="ticketDscount?ticketDscount.length>0:''">
        <div class="cardWrapper d-flex" v-for="discount in ticketDscount" :key="discount.id">
            <div class="detailsCol" >
                <h2>{{discount.name}}: 40,00 - 60,00 EUR</h2>
                <div class="priceWrap d-flex">
                    <div class="eventPrice1">
                        <p>Fees: € 2,50</p>
                        <p>Total: € 87,50</p>
                    </div>
                    <p>{{perUserQuantity!=''?'Per User Limit Exceeded!':''}}</p>
                    <div class="buttonWrap d-flex">
                        <button class="minusBtn" @click="removeFromCart()">-</button>
                        <span class="dassedIcon">{{itemQuantity?itemQuantity:0}}</span>
                        <button class="plusBtn" :class="perUserQuantity!=''||ticket.availableTickets==''?'disabled':''" :disabled="perUserQuantity!=''||ticket.availableTickets==''" @click="addToCart()">+</button>
                    </div>
                </div>
            </div>
        </div>
        </div>
        <div class="cardWrapper d-flex" v-else>
            <div class="detailsCol" >
                <!-- <h2>Discount Category: 40,00 - 60,00 EUR</h2> -->
                <div class="priceWrap d-flex">
                    <div class="eventPrice1">
                        <!-- <p>Fees: € 2,50</p>
                        <p>Total: € 87,50</p> -->
                    </div>
                    <p>{{perUserQuantity!=''?'Per User Limit Exceeded!':''}}</p>
                    <div class="buttonWrap d-flex">
                        <button class="minusBtn" @click="removeFromCart()">-</button>
                        <span class="dassedIcon">{{itemQuantity?itemQuantity:0}}</span>
                        <button class="plusBtn" :class="perUserQuantity!=''||ticket.availableTickets==''?'disabled':''" :disabled="perUserQuantity!=''||ticket.availableTickets==''" @click="addToCart()">+</button>
                    </div>
                </div>
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
export default {
    name: 'Tickets',
    components:{
        Loader
    },
    props: {
        ticket: Object,
        eventName: String,
        timeSlotId:String,
        ticketDscount:Object
    },
    setup(props) {
        const toggleButton = ref(false);
        const store = useStore();
        let cart = computed(function () {
            return store.state.cart.cartItems
        });

        function addToCart() {
            let ticket = {
                item: props.ticket,
                eventName: props.eventName,
                timeslot_id:props.timeSlotId
            }; 

            store.commit("addCartItem", ticket);
        }

        function removeFromCart() {
            store.commit("removeCartItem", props.ticket);
        }

        let itemQuantity = computed(function () {
            let ticket = props.ticket;
            let get_ticket = cart.value.filter((item) => item.id == ticket.id);
            return get_ticket[0]?.quantity;
        })

        let perUserQuantity = computed(function () {
            let ticket = props.ticket;
            let perUser = cart.value.filter((item) => item.quantity == ticket.ticketsPerUser);
            return perUser;
        })

        return {
            toggleButton,
            itemQuantity,
            addToCart,
            removeFromCart,
            perUserQuantity
        }
    },

}
</script>

<style>
</style>
