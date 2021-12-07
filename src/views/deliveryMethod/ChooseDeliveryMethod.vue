<template>
<div class="justify-content-between align-items-end header">
    <h1>
        <!-- <router-link to="/shop"> -->
        <a href="javascript:void(0)" @click="back">
            <i class="fa fa-angle-left" aria-hidden="true"></i>
            {{$t('common.cart')}}
        </a>
        <!-- </router-link> -->
    </h1>
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
        <button @click="createOrder" class="button btnBlack">{{$t('deliveryMethod.confirm')}}
        </button>
    </div>
</div>
</template>
<script>
import {ref,computed} from "vue";
import {useStore} from 'vuex';
import {useRouter} from "vue-router"
export default {
    name:'ChooseDeliveryMethod',
    components:{ 
    },
    setup() {
        const ticketFormat = ref('PDF');
        const store = useStore();
        const router = useRouter();
        let cart = computed(function () {
            return store.state.cart
        });

        let kycLevelId =computed(function () {
            return store.state.kycLevelId;
        });

        function createOrder() {
            let ticketDiscount =null
            let orderData = []
            let cartItems = cart.value.cartItems.map(elementKey => {
                if(elementKey.isDiscountItem){
                    if(orderData[elementKey.ticketId]){
                        orderData[elementKey.ticketId] = {
                            ticket_config_id: elementKey.ticketId,
                            quantity: elementKey.quantity,
                            timeslot_id: elementKey.timeSlotId,
                            ticket_discount: [...orderData[elementKey.ticketId].ticket_discount, elementKey.id],
                        }
                    }else{
                        orderData[elementKey.ticketId] = {
                            ticket_config_id: elementKey.ticketId,
                            quantity: elementKey.quantity,
                            timeslot_id: elementKey.timeSlotId,
                            ticket_discount: [elementKey.id],
                        }
                    }
                }else{
                    orderData[elementKey.id] = {
                        ticket_config_id: elementKey.id,
                        quantity: elementKey.quantity,
                        timeslot_id: elementKey.timeSlotId,
                        ticket_discount: orderData[elementKey.id] ?  orderData[elementKey.id].ticket_discount : [],
                    }
    
                }
                // ticket_config_id:elementKey.isDiscountItem==true?elementKey.ticketId:elementKey.id,
                // quantity:elementKey.quantity,
                // timeslot_id:elementKey.timeSlotId,
                // ticket_discount:elementKey.isDiscountItem==true?cart.value.cartItems.map((item)=>{
                //         return item.isDiscountItem==true?item.id:null
                //     }):[]
            });
            orderData = orderData.filter(x => x)
            // console.log("orderData", orderData);
            let format = ticketFormat.value
            store.commit('ticketFormat',ticketFormat.value)
            store.dispatch('createOrder', {
                order_item:orderData,
                format,
                kycLevelId:kycLevelId.value,
            })
        }

        function back() {
            store.state.errorMsg=null;
            router.push({
                path: '/shop'
            })
        }
        return {
            ticketFormat,
            createOrder,
            cart,
            kycLevelId,
            router,
            back
        };
    }

};
</script>
