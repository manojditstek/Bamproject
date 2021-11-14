<template>
<div class="singleTicketTotalAmount d-flex">
    <TotalTicketCalculation />
    <div class="labelBtn">
        <BackButton :message="'back'" class="button" />
    </div>
</div>
<div class="cardBodyWrapper">
    <!-- <Loader /> -->
    <div class="eventDiscountWrapper">
        <h2>{{ $t('cartTemp.cart') }}</h2>
        <div class="amountWrapper">
            <p>{{totalQuantity}} {{ $t('cartTemp.tickets') }} <span>{{(ticketPrice).toFixed(2)}} {{currency}}</span></p>
            <p>{{ $t('cartTemp.fees') }} <span>0.00 {{ $t('cartTemp.eur') }}</span></p>
            <p v-if="ticketDiscountPrice">Discount <span>{{ ticketDiscountPrice }} {{currency}}</span></p>
        </div>
        <div class="amountWrapper">
            <p>{{ $t('cartTemp.subtotal') }} <span>0.00 {{ $t('cartTemp.eur') }}</span></p>
            <p>{{ $t('cartTemp.tax') }} (0%) <span>0.00 {{ $t('cartTemp.eur') }}</span></p>
        </div>
        <div class="totalAmountWrapper ">
            <p>{{ $t('cartTemp.total') }} <span>{{(totalPrice).toFixed(2)}} {{currency}}</span></p>
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
            <p v-for="disc in item.discounts" :key="disc.id">
                {{disc.name}}
            </p>
            <div class="priceWrap">
                {{(item.totalPrice).toFixed(2)}} {{item.currency}}
            </div>
        </div>
        <div class="collapseArrow redBg" @click="removeFromCart(item)">
            <img src="assets/images/close-icon.svg" width="10" alt="image">
        </div>
    </div>
</div>

<div class="footerActionBtn">
    <button class="button" :class="totalQuantity==0?'disabled':''" :disabled="totalQuantity==0" @click="checkout">
        {{ $t('cartTemp.checkout') }}
    </button>
</div>

<div class="sloganText ">
    <p>{{ $t('cartTemp.msg') }}</p>
</div>
</template>

<script>
import {computed,} from 'vue';
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import TotalTicketCalculation from "./TotalTicketCalculation"
// import Loader from '../loader/Loader'
import BackButton from '../backButton/BackButton'
export default {
    name: "Cart",
    components: {
        TotalTicketCalculation,
        // Loader,
        BackButton
    },
    setup() {
        const store = useStore();
        const router = useRouter();

        let cart = computed(function () {
            return store.state.cart
        });

        let ticketPrice = computed(function(){
            let ticketPrice=0;
            cart.value.cartItems.forEach(element => {
              ticketPrice += element.totalPrice
            });
            return ticketPrice
        })

        let ticketDiscountPrice = computed(function(){
            let ticketPrice=0;
            cart.value.cartItems.forEach(element => {
              ticketPrice += element.totalDiscount;
            })
            return ticketPrice;
        })

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
                console.log('item1',item)
                store.commit("removeCartItemComplete", item);
            } else {
                console.log('item',item)
                store.commit("removeCartItem", item);
            }
        }

        function checkout() {
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
            checkout,
            ticketPrice,
            ticketDiscountPrice
        }
    }
}
</script>
