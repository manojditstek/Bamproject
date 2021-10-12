<template>
<div class="ticketToggle ">
    <div class="cardWrapper d-flex" :class="toggleButton?'active':''"  @click="toggleButton=!toggleButton">
        <div class="detailsCol">
            <h2>{{ticket?ticket.name:'Ticket Not Found!'}} : 0.00 - {{ticket?(ticket.faceValue).toFixed(2):'0.00'}} {{ticket?ticket.currency:'EUR'}}</h2>
            <p>incl. fees</p>
        </div>
        <div class="collapseArrow lightBg">
             <i class="fa fa-angle-right"></i>
        </div>
    </div>
    <div v-show="toggleButton" class="toggleList">
        <div class="cardWrapper d-flex">
            <div class="detailsCol">
                <h2>Discount Category: 40,00 - 60,00 EUR</h2>
                <div class="priceWrap d-flex">
                    <div class="eventPrice1">
                        <p>Fees: € 2,50</p>
                        <p>Total: € 87,50</p>
                    </div>
                    <p>{{perUserQuantity!=''?'Per User Limit Exceeded!':''}}</p>
                    <div class="buttonWrap d-flex">
                        <button class="minusBtn"  @click="removeFromCart()">-</button>
                        <span class="dassedIcon">{{itemQuantity?itemQuantity:0}}</span>
                        <button class="plusBtn" :disabled="perUserQuantity!=''" @click="addToCart()">+</button>
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
import { useStore } from "vuex";
export default {
    name: 'Tickets',
    props: {
        ticket: Object,
        eventName:String
    },
    setup(props) {
        const toggleButton = ref(false);
        const store = useStore();
        let cart = computed(function () {
            return store.state.cart.cartItems
        });

        
        function addToCart(){
            let ticket = {item:props.ticket,eventName:props.eventName};
            store.commit("addCartItem", ticket);
        }
        function removeFromCart(){
            store.commit("removeCartItem", props.ticket);
        }

        let itemQuantity = computed(function(){
            let ticket = props.ticket;
            let get_ticket = cart.value.filter((item) => item.id == ticket.id);
            return get_ticket[0]?.quantity;
        })

        let perUserQuantity = computed(function(){
            let ticket = props.ticket;
            let perUser = cart.value.filter((item) => item.quantity == ticket.ticketsPerUser);
            return perUser;
        })

        return {
            toggleButton,
            itemQuantity,
            addToCart,
            removeFromCart,perUserQuantity
        }
    },

}
</script>

<style>
</style>
