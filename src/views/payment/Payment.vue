<template>
    <div class="d-flex justify-content-between align-items-end">
      <div class="alert">
        <p>
          <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
          {{$t('timer.have')}} {{countDown}} {{$t('timer.afterHave')}}
        </p>
      </div>
    </div>
    <div class="cardBodyWrapper">
      <div class="innerHeading">
        <h4>{{$t('payment.payment')}}</h4>
      </div>
      <div class="inputWrapper payment">
        <div class="inputInnerWrapper" :class="payMethod=='card' ?'active':''">
          <div class="inputGroup">
            <input
              type="radio"
              id="test1"
              :value="'card'"
              v-model="payMethod"
              @click="paymentInitiate(type='card')"
            />
            <label for="test1"></label>
          </div>
          <h4>{{$t('payment.creditCard')}}</h4>
        </div>
        <div class="inputInnerWrapper" :class="payMethod=='epsBank' ?'active':''">
            <div class="inputGroup">
                <input type="radio" id="test2" :value="'epsBank'" v-model="payMethod" @click="paymentInitiate(type='eps')" />
                <label for="test2"></label>
            </div>
            <h4>{{$t('payment.eps')}}</h4>
        </div>
      </div>
      <div class="hr"></div>

    <div v-if="payMethod=='card'" class="stripeWrapper">
        <StripeElement :element="cardElement" @change="event = $event" class="stripe" />
        <div class="error-message" v-if="event && event.error">{{ event.error.message }}</div>
        <div class="error-message" v-if="!event && cardField">{{ $t('common.card') }}</div>
    </div>
    <div v-if="payMethod=='epsBank'">
        <div class="stripeWrapper">
            <div class="formInputs">
                <div class="formGroup">
                    <input type="text" class="form-control" placeholder="Account Holder Name" v-model.trim="name" />
                </div>
            </div>
            <div class="formInputs">
                <div class="formGroup w-100">
                    <div class="stripeWrapper">
                        <StripeElement :element="epsElement" @change="event = $event" class="stripe" />
                    </div>
                </div>
            </div>
          </div>
        </div>
            <div class="footerActionBtn btns">
                <button class="button" :class="payMethod=='epsBank'&& name==''?'disabled':''" @click="submit">{{$t('common.pay')}} {{(totalPrice).toFixed(2)}} {{currency}}</button>
                <router-link to="/" class="button btnGray">{{$t('common.cancel')}}</router-link>
           </div>
      </div>
</template>

<script>
import {ref,computed,} from 'vue'
import {useStripe,StripeElement} from 'vue-use-stripe'
import {useRouter} from "vue-router";
import {useStore} from 'vuex';
export default {
    components: {
        StripeElement,
    },
    setup() {
        const event = ref(null);
        const cardField = ref(false);
        const store = useStore();
        const router = useRouter();
        const name = ref('');

        const payMethod = ref()
        const cardConfig = computed(() => {
            return store.state.paymentInitiateIds;
        });

        const totalPrice = computed(() => {
            return store.state.cart.itemTotalAmount;
        });
        const countDown = computed(() => {

            return store.state.timerDispaly;
        })
        let currency = computed(function () {
            return store.state.currency
        });

        let orderID = computed(() => {
            return store.state.createdOrder;
        })

        const {stripe,elements: [epsElement, cardElement]} = useStripe({
            key: 'pk_test_guTC6Gf1mA5drZHtmEGImgC600HIXNXoTd',
            elements: [{
                type: 'epsBank',
                options: {
                    style: {
                        base: {
                            padding: '8px 10px',
                            color: '#32325d',
                            fontSize: '16px',
                            '::placeholder': {
                                color: '#aab7c4'
                            },
                        },
                    },
                }
            }, {
                type: 'card',
                options: {}
            }, ],

        })

      
        

        async function paymentInitiate(value) {
            store.dispatch('paymentInitiate', {
                id: orderID.value.id,
                payMethod: value
            })

        }
    

        const submit = async () => {
            if(event.value==null){
                cardField.value=true
            }
            console.log('EV',event.value)
            if (event.value ?.complete) {
                /* Card payment initiated */
                cardField.value=false
                if (payMethod.value == 'card') {
                    const response = await stripe.value ?.confirmCardPayment(cardConfig.value.paymentIntent.clientSecret, {
                        payment_method: {
                            card: cardElement.value,
                        },
                    }).catch(error => {
                        store.commit('loadingStatus', false)
                        store.commit('errorMsg', error.response);                      
                    });
                    if (response.paymentIntent.status == 'succeeded') { 
                        // store.dispatch('downloadTicketPdf', {
                        //     id: orderID.value.id
                        // });
                        router.push({
                            path: '/download-ticket'
                        })
                    }
                } //End card 

                /* For EPS Bank payment */
                else if (payMethod.value == 'epsBank') {
                    const response = await stripe.value ?.confirmEpsPayment(cardConfig.value.paymentIntent.clientSecret, {
                        payment_method: {
                            eps: epsElement.value,
                            billing_details: {
                                name: name.value,
                            },
                        },
                        
                        return_url: 'http://localhost:8084/',
                        
                    }).catch(error => {
                        store.commit('loadingStatus', false)
                        store.commit('errorMsg', error.response);
                       

                    });
                    if (response == 200) {
                        store.dispatch('downloadTicket', {
                            id: orderID.value.id
                        });
                        router.push({
                            path: '/download-ticket'
                        })
                    }
                    
                } // End EPS
            }
        }

        return {
            paymentInitiate,
            event,
            payMethod,
            cardElement,
            epsElement,
            submit,
            cardConfig,
            totalPrice,
            currency,
            countDown,
            orderID,
            name,
            cardField
        }

  }
};
</script>

<style scoped>
.stripe {
  background-color: rgb(254, 254, 255);
}
</style>
