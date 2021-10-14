<template>
<div class="d-flex justify-content-between align-items-end">
    <div class="alert">
        <p>
            <i class="fa fa-exclamation-triangle" aria-hidden="true"></i> have {{countDown}} minutes to complete your order
        </p>
    </div>
</div>
<!--step 1-->
<div class="cardBodyWrapper">
    <div class="innerHeading">
        <h4>Payment</h4>
    </div>
    <div class="inputWrapper payment">
        <div class="inputInnerWrapper" :class="cardMethod==true ?'active':''">
            <div class="inputGroup">
                <input type="radio"  id="test1" :value="true" v-model="cardMethod" />
                <label for="test1"></label>
            </div>
            <h4>Credit Card</h4>
        </div>
        <div class="inputInnerWrapper" :class="cardMethod==false ?'active':''">
            <div class="inputGroup">
                <input type="radio"  id="test2" :value="false" v-model="cardMethod" checked />
                <label for="test2"></label>
            </div>
            <h4>EPS</h4>
        </div>
    </div>
    <div class="hr"></div>
    <div class="formInputs" v-if="cardMethod==true">
        <div class="formGroup">
            <input type="text" class="form-control" />
            <div class="labelInput">First Name</div>
        </div>
        <div class="formGroup space">
            <div class="formGroup">
                <input type="text" class="form-control" placeholder="MM/JJ" />
            </div>
            <div class="formGroup">
                <input type="number" class="form-control" placeholder="Prufziffer" />
            </div>
        </div>

    </div>

    <div v-else>
      <div class="formInputs">
        <div class="formGroup">
            <input type="text" class="form-control" placeholder="Account Holder Name" />
        </div>
    </div>
    <div class="formInputs">
        <div class="formGroup w-100">
            <select class="form-control" placeholder="Choose Your Bank">
                <option value="0" selected>Choose Your Bank</option>
                <option value="1">HDFC Bank</option>
                <option value="1">HDFC Bank</option>
                <option value="1">HDFC Bank</option>
            </select>
        </div>
    </div>
    </div>
    <div class="footerActionBtn btns">
        <router-link to="/" class="button" @click="completeOrder">PAY {{totalPrice}} {{currency}}</router-link>
        <router-link to="/" class="button btnGray">Cancel</router-link>
    </div>
</div>
<!-- end step 1 -->

</template>

<script>
import {
    ref,
    computed
} from "vue";
import {
    useStore
} from 'vuex';
import { StripeElementCard } from '@vue-stripe/vue-stripe';
import DataService from "../../services/DataService"
export default {
  name:'Payment',

 components:{
  //  StripeElementCard,
 },
    setup() {
        const cardMethod = ref(false);
        const toggleButton = ref(false);
        const payResp = ref(false);
        const formErrors = ref([]);
         const store =  useStore();

        const totalPrice = computed(() => {
            return store.state.cart.itemTotalAmount;
        });
         const countDown = computed(() => {

            return store.state.timerDispaly;
        })
        let currency = computed(function () {
            return store.state.currency
        });
        
       async function completeOrder (){
          await DataService.paymentMethod().then((response) => {
            payResp.value = response.data.data;
            }).catch(error => {
                console.log(error);
            }); 
        }


        return {
            toggleButton,
            completeOrder,
            cardMethod,
            totalPrice,
            currency,
            countDown,
            formErrors,
            payResp
        };
    }
};
</script>
