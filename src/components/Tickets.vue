<template>
<div class="ticketToggle ">
    <div class="cardWrapper d-flex" :class="toggleButton?'active':''"  @click="toggleButton=!toggleButton">
        <div class="detailsCol">
            <h2>{{ticket?ticket.name:'Ticket Not Found!'}} : 0.00 - {{ticket?(ticket.face_value).toFixed(2):'0.00'}} {{ticket?ticket.currency:'EUR'}}</h2>
            <p>incl. fees</p>
        </div>
        <div class="collapseArrow lightBg">
            <img src="../assets/images/black-arrow.svg" width="15" alt="image">
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
                    <div class="buttonWrap d-flex">
                        <button class="minusBtn" @click="removeFromCart()">-</button>
                        <span class="dassedIcon">{{itemQuantity?itemQuantity:0}}</span>
                        <button class="plusBtn" @click="addToCart()">+</button>
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
        ticket: Object
    },
    setup(props) {
        const toggleButton = ref(false);
        const store = useStore();
        let cart = computed(function () {
            return store.state.cart.cartItems
        });

        function addToCart(){
            store.commit("addCartItem", props.ticket);
        }
        function removeFromCart(){
            store.commit("removeCartItem", props.ticket);
        }

        let itemQuantity = computed(function(){
            let get_ticket = cart.value.filter((item) => item.id == props.ticket.id);
            return get_ticket[0]?.quantity;
        })

        return {
            toggleButton,
            itemQuantity,
            addToCart,
            removeFromCart
        }
    },

}
</script>

<style>
</style>
