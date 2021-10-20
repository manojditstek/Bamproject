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
        <div class="inputInnerWrapper" :class="payMethod=='card' ?'active':''">
            <div class="inputGroup">
                <input type="radio" id="test1" :value="'card'" v-model="payMethod" @click="paymentInitiate(type='card')" />
                <label for="test1"></label>
            </div>
            <h4>Credit Card</h4>
        </div>
        <div class="inputInnerWrapper" :class="payMethod=='eps' ?'active':''">
            <div class="inputGroup">
                <input type="radio" id="test2" :value="'eps'" v-model="payMethod" @click="paymentInitiate(type='eps')" />
                <label for="test2"></label>
            </div>
            <h4>EPS</h4>
        </div>
    </div>
    <div class="hr"></div>

    <div v-if="payMethod=='card'" class="stripeWrapper">
        <Loader />
        <StripeElement :element="cardElement" @change="event = $event" class="stripe" />
        <div class="error-message" v-if="event && event.error">{{ event.error.message }}</div>
    </div>
    <div v-if="payMethod=='eps'">

        <div class="stripeWrapper">
            <Loader />
            <div class="formInputs">
                <div class="formGroup">
                    <input type="text" class="form-control" placeholder="Account Holder Name" />
                </div>
            </div>
            <div class="formInputs">
                <div class="formGroup w-100">
                    <!-- <select class="form-control" placeholder="Choose Your Bank">
                        <option value="0" selected>Choose Your Bank</option>
                        <option value="1">HDFC Bank</option>
                        <option value="1">HDFC Bank</option>
                        <option value="1">HDFC Bank</option>
                    </select> -->
                    <StripeElement :element="cardElement" @change="event = $event" class="stripe" />
                </div>
            </div>
        </div>
    </div>

    <div class="footerActionBtn btns">
        <button class="button" @click="registerCard">PAY {{totalPrice}} {{currency}}</button>
        <router-link to="/" class="button btnGray">Cancel</router-link>
    </div>
</div>
</template>

<script>
import {
    defineComponent,
    ref,
    computed
} from 'vue'
import {
    useStripe,
    StripeElement
} from 'vue-use-stripe'
import {
    useRouter
} from "vue-router";
import {
    useStore
} from 'vuex';
import Loader from '../../components/loader/Loader.vue';
export default {
    components: {
        StripeElement,
        Loader
    },
    setup() {
        const event = ref(null);
        const payMethod = ref('card');
        const store = useStore();
        const router = useRouter();

        const cardConfig = computed(() => {
            console.log('cardConfig11==>', store.state.paymentInitiateIds)
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

        const {
            stripe,
            elements: [cardElement,idealBankElement]
        } = useStripe({
            key: cardConfig.value.payment_intent ? cardConfig.value.payment_intent.publishable_key : 'pk_test_guTC6Gf1mA5drZHtmEGImgC600HIXNXoTd' || '',
            elements: [{
                type: payMethod.value,
                options: {}
            }],
        })

        async function paymentInitiate(value) {
            payMethod.value=value
            store.dispatch('paymentInitiate', {
                id: orderID.value.id,
                payMethod: value
            })

            // router.push({
            //     path: '/payment-confirm'
            // })

        }

        const registerCard = async () => {
            if (event.value ?.complete) {
                // Refer to the official docs to see all the Stripe instance properties.
                // E.g. https://stripe.com/docs/js/setup_intents/confirm_card_setup
                console.log('cardConfig12secret==>', cardConfig.value.payment_intent.client_secret)
                const response = await stripe.value ?.confirmCardPayment(cardConfig.value.payment_intent.client_secret, {
                    payment_method: {
                        card: cardElement.value,
                    },
                });
                if (response.paymentIntent.status == 'succeeded') {
                    console.log('paymentCompleted=>', response)
                    store.dispatch('downloadTicket', {
                        id: orderID.value.id
                    });

                    router.push({
                        path: '/download-ticket'
                    })
                }

            }
        }

        const registerBank = async () => {
            if (event.value ?.complete) {
                // Refer to the official docs to see all the Stripe instance properties.
                // E.g. https://stripe.com/docs/js/setup_intents/confirm_card_setup
                console.log('cardConfig12secret==>', cardConfig.value.payment_intent.client_secret)
                const response = await stripe.value ?.confirmIdealPayment(cardConfig.value.payment_intent.client_secret, {
                    payment_method: {
                        ideal: idealBankElement.value,
                    },
                });
                if (response.paymentIntent.status == 'succeeded') {
                    console.log('paymentCompleted=>', response)
                    store.dispatch('downloadTicket', {
                        id: orderID.value.id
                    });

                    router.push({
                        path: '/download-ticket'
                    })
                }

            }
        }

        return {
            paymentInitiate,
            event,
            cardElement,
            registerCard,
            registerBank,
            cardConfig,
            payMethod,
            totalPrice,
            currency,
            countDown,
            orderID,
        }
    },
}
</script>

<style scoped>
.stripe {
    background-color: rgb(254, 254, 255);
}
</style>
 