<template>
<!-- step 1 -->
<div class="d-flex justify-content-between align-items-end header">
    <h2>
        <router-link to="/shop">
            <i class="fa fa-angle-left" aria-hidden="true"></i>
            Cart
        </router-link>
    </h2>
    <div class="datePicker"></div>
</div>
<!---->
<div class="cardBodyWrapper">
    <div class="innerHeading">
        <h4>Delivery Methods</h4>
        <p>Secure digital ticket or the old-school way?</p>
    </div>
    <div class="inputWrapper">
        <div class="inputInnerWrapper" :class="ticketFormat=='BAM' ?'active':''">
            <div class="inputGroup">
                <input type="radio" id="test1" name="ticketFormat" :value="'BAM'" v-model="ticketFormat" disabled>
                <label for="test1"></label>
            </div>
            <h4>BAM Tickets</h4>
            <p>Compatible with your B.A.M Wallet App. Please prepare your smartphone for the next step.</p>
        </div>
        <div class="inputInnerWrapper" :class="ticketFormat=='PDF' ?'active':''">
            <div class="inputGroup">
                <input type="radio" id="test2" name="ticketFormat" :value="'PDF'" v-model="ticketFormat" checked>
                <label for="test2"></label>
            </div>
            <h4>PDF/PK PASS</h4>
            <p>Use with any iOS and Android App that supports pkpass files or print your tickets at home.</p>
        </div>
    </div>
    <div class="footerActionBtn">
        <button @click="createOrder" class="button">CONFIRM
        </button>
        <!-- <router-link to="/user-form" class="button"><button type="button"> CONFIRM </button></router-link> -->
    </div>
    

</div>
<!---->
</template>

<script>
import {
    ref,
    computed
} from "vue";
import {
    useStore
} from 'vuex';
export default {
    setup() {
        const ticketFormat = ref('PDF');
        const store = useStore();
        let cart = computed(function () {
            return store.state.cart
        });

        function createOrder() {
            let cartItems = cart.value.cartItems.map(elementKey => ({
                ticket_config_id:elementKey.id,
                quantity:elementKey.quantity,
                timeslot_id:elementKey.timeslot_id
            }));
            let format = ticketFormat.value
            store.dispatch('createOrder', {
                cartItems,
                format
            })
        }
        return {
            ticketFormat,
            createOrder,
            cart
        };
    }

};
</script>
