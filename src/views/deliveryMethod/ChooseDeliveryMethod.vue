<template>
<div class="d-flex justify-content-between align-items-end header">
    <h2>
        <router-link to="/shop">
            <i class="fa fa-angle-left" aria-hidden="true"></i>
            {{$t('common.cart')}}
        </router-link>
    </h2>
    <div class="datePicker"></div>
</div>
<div class="cardBodyWrapper">
    <div class="innerHeading">
        <h4>{{$t('deliveryMethod.heading')}}</h4>
        <p>{{$t('deliveryMethod.p1')}}</p>
    </div>
    <div class="inputWrapper">
        <div class="inputInnerWrapper" :class="ticketFormat=='BAM' ?'active':''">
            <div class="inputGroup">
                <input type="radio" id="test1" name="ticketFormat" :value="'BAM'" v-model="ticketFormat" disabled>
                <label for="test1"></label>
            </div>
            <h4>{{$t('deliveryMethod.BAMTickets')}}</h4>
            <p>{{$t('deliveryMethod.p2')}}</p>
        </div>
        <div class="inputInnerWrapper" :class="ticketFormat=='PDF' ?'active':''">
            <div class="inputGroup">
                <input type="radio" id="test2" name="ticketFormat" :value="'PDF'" v-model="ticketFormat" checked>
                <label for="test2"></label>
            </div>
            <h4>{{$t('deliveryMethod.pdfPkPass')}}</h4>
            <p>{{$t('deliveryMethod.p3')}}</p>
        </div>
    </div>
    <div class="footerActionBtn">
        <button @click="createOrder" class="button">{{$t('deliveryMethod.confirm')}}
        </button>
    </div>
</div>
</template>
<script>
import {ref,computed} from "vue";
import {useStore} from 'vuex';
export default {
    name:'ChooseDeliveryMethod',
    components:{ 
    },
    setup() {
        const ticketFormat = ref('PDF');
        const store = useStore();
        let cart = computed(function () {
            return store.state.cart
        });

        let kycLevelId =computed(function () {
            return store.state.kycLevelId;
        });

        function createOrder() {
            let cartItems = cart.value.cartItems.map(elementKey => ({
                ticket_config_id:elementKey.id,
                quantity:elementKey.quantity,
                timeslot_id:elementKey.timeSlotId,
                ticket_discount:elementKey.discounts.map((item)=>{return item.id})
            }));
            let format = ticketFormat.value
            store.commit('ticketFormat',ticketFormat.value)
            store.dispatch('createOrder', {
                cartItems,
                format,
                kycLevelId:kycLevelId.value,
            })
        }
        return {
            ticketFormat,
            createOrder,
            cart,
            kycLevelId
        };
    }

};
</script>
