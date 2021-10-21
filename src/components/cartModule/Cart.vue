<template>
<div class="singleTicketTotalAmount d-flex">
    <TotalTicketCalculation />
    <div class="labelBtn">
        <router-link to="/" class="button">
            Back
        </router-link>
    </div>
</div>
<div class="cardBodyWrapper">
    <Loader />
    <div class="eventDiscountWrapper">
        <h2>Cart</h2>
        <div class="amountWrapper">
            <p>{{totalQuantity}} Tickets <span>{{totalPrice}}</span></p>
            <p>Fees <span>11,20 EUR</span></p>
        </div>
        <div class="amountWrapper">
            <p>Subtotal <span>EUR</span></p>
            <p>Tax (20%) <span>EUR</span></p>
        </div>
        <div class="totalAmountWrapper ">
            <p>Total <span>{{totalPrice}}</span></p>
        </div>
    </div>
</div>

<div class="ticketWrapper">
    <div class="ticketCategory d-flex" v-for=" item in cart.cartItems" :key="item.id">
        <div class="dateCol">
            <h2>{{item.quantity}}</h2>
        </div>
        <div class="detailsCol">
            <h2>{{item.name}}</h2>
            <p>
                {{item.eventName}}
            </p>
            <div class="priceWrap">
                {{item.totalPrice}} {{currency}}
            </div>
        </div>
        <div class="collapseArrow redBg" @click="removeFromCart(item)">
            <img src="assets/images/close-icon.svg" width="10" alt="image">
        </div>
    </div>
</div>

<div class="footerActionBtn">
    <!-- <router-link to="/delivery-method" class="button">
            CHECKOUT
    </router-link> -->
    <button class="button" :class="totalQuantity==0?'disabled':''" :disabled="totalQuantity==0" @click="checkout">
            CHECKOUT
    </button>
</div>

<div class="sloganText ">
    <p>Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.</p>
</div>

</template>

<script>
import {
    computed,
} from 'vue';
import {
    useStore
} from "vuex";
import {
    useRouter
} from "vue-router";
import TotalTicketCalculation from "./TotalTicketCalculation.vue"
import Loader from '../loader/Loader'
export default {
    name: "Cart",
    components: {
        TotalTicketCalculation,
        Loader
    },
    setup() {
        const store = useStore();
        const router = useRouter();

        let cart = computed(function () {
            return store.state.cart
        });

        let event = computed(function () {
            return store.state.event
        });

        let currency = computed(function () {
            return store.state.currency
        });

        const totalPrice = computed(() => {
            return store.state.cart.itemTotalAmount;
        });

        const totalQuantity = computed(() => {
            return store.state.cart.itemsTotalQuantity;
        });

        function removeFromCart(item, complete = true) {
            if (complete) {
                store.commit("removeCartItemComplete", item);
            } else {
                store.commit("removeCartItem", item);
            }
        }

        function checkout(){

            router.push({
                        path: '/delivery-method'
                    })
        }

        return {
            cart,
            totalPrice,
            totalQuantity,
            removeFromCart,
            currency,
            event,
            checkout

        }
    }
}
</script>
