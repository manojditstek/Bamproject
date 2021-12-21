<template>
  <div class="d-flex justify-content-between align-items-end">
    <div class="alert">
      <p>
        <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
        {{ $t("timer.have") }} {{ countDown }} {{ $t("timer.afterHave") }}
      </p>
    </div>
  </div>
  <div class="cardBodyWrapper">
    <div class="innerHeading">
      <h1>{{ $t("payment.payment") }}</h1>
    </div>
    <div class="inputWrapper payment">
      <div
        class="inputInnerWrapper"
        :class="payMethod == 'card' ? 'active' : ''"
      >
        <div class="inputGroup cards">
          <input
            type="radio"
            id="test1"
            :value="'card'"
            v-model="payMethod"
            @click="paymentInitiate((type = 'card'))"
          />
          <label for="test1"></label>
        </div>
        <h4>{{ $t("payment.creditCard") }}</h4>
      </div>
      <div
        class="inputInnerWrapper"
        :class="payMethod == 'epsBank' ? 'active' : ''"
      >
        <div class="inputGroup cards">
          <input
            type="radio"
            id="test2"
            :value="'epsBank'"
            v-model="payMethod"
            @click="paymentInitiate((type = 'eps'))"
          />
          <label for="test2"></label>
        </div>
        <h4>{{ $t("payment.eps") }}</h4>
      </div>
    </div>
    <div class="hr"></div>

    <div v-if="payMethod == 'card'" class="stripeWrapper">
      <StripeElement
        :element="cardElement"
        @change="event = $event"
        class="stripe"
      />
      <div class="error-message" v-if="event && event.error">
        {{ event.error.message }}
      </div>
      <div class="error-message" v-if="!event && cardField">
        {{ $t("common.errorOnPymntField") }}
      </div>
    </div>
    <div v-if="payMethod == 'epsBank'">
      <div class="stripeWrappernew">
        <div class="formInputs">
          <div class="formGroup">
            <input
              type="text"
              class="form-control"
              placeholder="Account Holder Name"
              v-model.trim="name"
            />
          </div>
        </div>
        <div class="formInputs">
          <div class="formGroup w-100">
            <div class="stripeInner">
              <StripeElement
                :element="epsElement"
                @change="event = $event"
                class="stripe"
              />
              <div class="error-message" v-if="!event && cardField">
                {{ $t("common.errorOnPymntField") }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footerActionBtn btns">
      <button class="button btnBlack" @click="submit">
        {{ $t("common.pay") }} {{ totalPrice.toFixed(2) }} {{ currency }}
      </button>
      <a @click="backToHome()" class="button btnGray">{{
        $t("common.cancel")
      }}</a>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStripe, StripeElement } from "vue-use-stripe";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import Swal from "sweetalert2";
export default {
  components: {
    StripeElement,
  },
  setup() {
    const event = ref(null);
    const cardField = ref(false);
    const store = useStore();
    const router = useRouter();
    const name = ref("");

    const payMethod = ref();
    const cardConfig = computed(() => {
      return store.state.paymentInitiateIds;
    });

    const totalPrice = computed(() => {
      return store.state.cart.itemTotalAmount;
    });
    const countDown = computed(() => {
      return store.state.timerDispaly;
    });
    let currency = computed(function () {
      return store.state.cart.cartItems[0].currency;
    });

    let orderID = computed(() => {
      return store.state.createdOrder;
    });

    const {
      stripe,
      elements: [epsElement, cardElement],
    } = useStripe({
      key: "pk_test_guTC6Gf1mA5drZHtmEGImgC600HIXNXoTd",
      elements: [
        {
          type: "epsBank",
          options: {
            style: {
              base: {
                padding: "8px 10px",
                color: "#393939",
                fontSize: "14px",
                "::placeholder": {
                  color: "#39393966",
                },
              },
            },
          },
        },
        {
          type: "card",
          options: {
            style: {
              base: {
                iconColor: "#393939",
                color: "#393939",
                fontSize: "14px",
                "::placeholder": {
                  color: "#39393966",
                },
              },
            },
          },
        },
      ],
    });

    async function paymentInitiate(value) {
      store.dispatch("paymentInitiate", {
        id: orderID.value.id,
        payMethod: value,
      });
    }

    const submit = async () => {
      if (event.value == null) {
        cardField.value = true;
      }
      if (event.value?.complete) {
        /* Card payment initiated */
        cardField.value = false;
        if (payMethod.value == "card") {
          const response = await stripe.value
            ?.confirmCardPayment(cardConfig.value.paymentIntent.clientSecret, {
              payment_method: {
                card: cardElement.value,
              },
            })
            .catch((error) => {
              store.commit("loadingStatus", false);
              store.commit("errorMsg", error.response);
            });
          if (response.paymentIntent.status == "succeeded") {
            const Toast = Swal.mixin({
              toast: true,
              position: "top",
              showConfirmButton: false,
              timer: 312000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
            });

            Toast.fire({
              icon: "success",
              title: "Payment completed!",
            });
            router.push({
              path: "/download-ticket",
            });
          }
        } //End card

        /* For EPS Bank payment */
        else if (payMethod.value == "epsBank") {
          const response = await stripe.value
            ?.confirmEpsPayment(cardConfig.value.paymentIntent.clientSecret, {
              payment_method: {
                eps: epsElement.value,
                billing_details: {
                  name: name.value,
                },
              },

              return_url: "http://localhost:8084/",
            })
            .catch((error) => {
              store.commit("loadingStatus", false);
              store.commit("errorMsg", error.response);
            });

          if (response.paymentIntent.status == "succeeded") {
            router.push({
              path: "/download-ticket",
            });
          }
        } // End EPS
      }
    };

    function backToHome() {
      store.commit("backToHome");
      router.push({path: "/",});
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
      cardField,
      backToHome,
    };
  },
};
</script>

<style scoped>
.stripe {
  background-color: rgb(254, 254, 255);
}
</style>
