<template>
<div class="d-flex justify-content-between align-items-end">
    <div class="alert">
        <Timer />
    </div>
</div>
<div class="cardBodyWrapper">
    <Loader />
    <div class="innerHeading">
        <h4>{{ $t("orderContactForm.personalData") }}</h4>
    </div>
    <div class="formInputs">
        <div class="formGroup">
            <input type="text" class="form-control" :class="
            data.first_name ? 'active ' : formErrors[0] ? ' errorInput' : ''
          " v-model.trim="data.first_name" @input="firstName()"/>
            <div class="labelInput">{{ $t("orderContactForm.firstName") }}</div>
            <div v-if="!data.first_name && formErrors[0]" class="error">
                {{ $t("formValidation.firstName") }}
            </div>
        </div>
        <div class="formGroup">
            <input type="text" class="form-control" :class="
            data.last_name ? 'active' : formErrors[1] ? ' errorInput' : ''
          " v-model.trim="data.last_name"  @input="lastName()"/>
            <div class="labelInput">{{ $t("orderContactForm.lastName") }}</div>
            <div v-if="!data.last_name && formErrors[1]" class="error">
                {{ $t("formValidation.lastName") }}
            </div>
        </div>
        <div class="formGroup">
            <input type="text" class="form-control" :class="
            data.phone && !formErrors[2]
              ? 'active'
              : formErrors[2]
              ? ' errorInput'
              : ''
          " v-model.trim="data.phone" @input="phoneNumber()"/>
            <div class="labelInput">{{ $t("orderContactForm.phone") }}</div>
            <div v-if="!data.phone && formErrors[2] != 'notValid' && formErrors[2]" class="error">
                {{ $t("formValidation.phone") }}
            </div>
            <div v-if="formErrors[2] == 'notValid' && formErrors[2]" class="error">
                {{ $t("formValidation.validPhone") }}
            </div>
        </div>
    </div>
    <div class="formInputs">
        <div class="formGroup">
            <label>{{ $t("orderContactForm.emailRequired") }}</label>
            <div class="formLabel">
                <input type="email" class="form-control" :class="
              data.email && !formErrors[3]
                ? 'active'
                : formErrors[3]
                ? ' errorInput'
                : ''
            " v-model.trim="data.email" @input="emailCheck()"/>
                <div class="labelInput">{{ $t("orderContactForm.email") }}</div>
                <div v-if="formErrors[3] != 'notValid' && formErrors[3]" class="error">
                    {{ $t("formValidation.email") }}
                </div>
                <div v-if="formErrors[3] == 'notValid' && formErrors[3]" class="error">
                    {{ $t("formValidation.validEmail") }}
                </div>
            </div>
        </div>
        <div class="formGroup">
            <div class="checkbox">
                <input type="checkbox" id="html" :value="true" v-model="checkMail" />
                <label for="html"></label>
            </div>
            <label>{{ $t("orderContactForm.billingEmail") }}</label>
            <div class="formLabel">
                <input v-if="checkMail" type="email" class="form-control" :class="
              data.email && !formErrors[3]
                ? 'active'
                : formErrors[3]
                ? ' errorInput'
                : ''
            " v-model.trim="data.email" />
                <input v-else type="email" class="form-control" :class="
              data.billing_email && !formErrors[4]
                ? 'active'
                : formErrors[4]
                ? ' errorInput'
                : ''
            " v-model.trim="data.billing_email" @input="deliveryMail()"/>
                <div class="labelInput">{{ $t("orderContactForm.email") }}</div>
                <div v-if="!checkMail && formErrors[4] != 'notValid' && formErrors[4]" class="error">
                    {{ $t("formValidation.email") }}
                </div>
                <div v-if="!checkMail && formErrors[4] == 'notValid' && formErrors[4]" class="error">
                    {{ $t("formValidation.validEmail") }}
                </div>
            </div>
        </div>
    </div>
    <div class="footerActionBtn btns">
        <button class="button btnBlack" @click="payMethod()">
            {{ $t("common.pay") }} {{ totalPrice.toFixed(2) }} {{ currency }}
        </button>
        <a @click="backToHome()" class="button btnGray">{{
        $t("common.cancel")
      }}</a>
    </div>
</div>
</template>

<script>
import { ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import Timer from "../../components/SetTimer";
export default {
  name: "UserForm",
  components: {
    Timer,
  },

  setup() {
    const checkMail = ref(false);
    const router = useRouter();
    const store = useStore();
    const formErrors = ref([]);
    const data = reactive({
      first_name: null,
      last_name: null,
      phone: null,
      email: null,
      billing_email: null,
    });
    const totalPrice = computed(() => {
      return store.state.cart.itemTotalAmount;
    });
    let currency = computed(() => {
      return store.state.cart.cartItems[0].currency;
    });

    let orderID = computed(() => {
      return store.state.createdOrder;
    });

    let payTicketType = orderID.value.orderItem.filter(
      (item) => item.ticket[0].ticketConfig.faceValue > 0
    );

    function payMethod() {
      if (
        validation() == true &&
        firstName() == true &&
        lastName() == true &&
        phoneNumber() == true &&
        emailCheck() == true &&
        deliveryMail() == true
      ) {
        store.dispatch("orderContact", {
          id: orderID.value.id,
          data,
        });
        if (payTicketType.length > 0) {
          router.push({
            path: "/payment",
          });
        } else {
          router.push({
            path: "/download-ticket",
          });
        }
      } else {
        return false;
      }
    }

    /* Form validation methods */

    function validation() {
      if (!data.first_name) {
        formErrors.value[0] = true;
      }
      if (!data.last_name) {
        formErrors.value[1] = true;
      }
      if (!data.phone) {
        formErrors.value[2] = true;
      } else if (!validPhone(data.phone)) {
        formErrors.value[2] = "notValid";
      }
      if (!data.email) {
        formErrors.value[3] = true;
      } else if (!validEmail(data.email)) {
        formErrors.value[3] = "notValid";
      }
      if (!checkMail.value && !data.billing_email) {
        formErrors.value[4] = true;
      } else if (!checkMail.value && !validEmail(data.billing_email)) {
        formErrors.value[4] = "notValid";
      } else {
        return true;
      }
    }

    function firstName() {
      formErrors.value[0] = "";
      if (!data.first_name) {
        formErrors.value[0] = true;
      } else {
        return true;
      }
    }

    function lastName() {
      formErrors.value[1] = "";
      if (!data.last_name) {
        formErrors.value[1] = true;
      } else {
        return true;
      }
    }

    function phoneNumber() {
      formErrors.value[2] = "";
      if (!data.phone) {
        formErrors.value[2] = true;
      } else if (!validPhone(data.phone)) {
        formErrors.value[2] = "notValid";
      } else {
        return true;
      }
    }

    function emailCheck() {
      formErrors.value[3] = "";
      if (!data.email) {
        formErrors.value[3] = true;
      } else if (!validEmail(data.email)) {
        formErrors.value[3] = "notValid";
      } else {
        return true;
      }
    }

    function deliveryMail() {
      formErrors.value[4] = "";
      if (!checkMail.value && !data.billing_email) {
        formErrors.value[4] = true;
      } else if (!checkMail.value && !validEmail(data.billing_email)) {
        formErrors.value[4] = "notValid";
      } else {
        return true;
      }
    }
    // end validation

    /* Regx checking for email and phone */
    function validEmail(email) {
      var re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }

    function validPhone(phone) {
      data.phone = phone.replace(/\D/g, "");
      var re = /^(\+|\d)[0-9]{7,16}$/; ///^[0-9]*$/;
      return re.test(data.phone);
    }
    //end regx

    function backToHome() {
      store.commit("backToHome");
      location.reload();
    }
    return {
      data,
      checkMail,
      payMethod,
      totalPrice,
      currency,
      formErrors,
      validEmail,
      validPhone,
      firstName,
      lastName,
      phoneNumber,
      emailCheck,
      deliveryMail,
      orderID,
      backToHome,
    };
  },
};
</script>
