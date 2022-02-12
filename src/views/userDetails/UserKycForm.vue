<template>
    <div class="justify-content-between align-items-end header">
        <h1>
            <router-link to="/shop">
                <i class="fa fa-angle-left" aria-hidden="true"></i>
                {{ $t("cartTemp.cart") }}
            </router-link>
        </h1>
    </div>
    <div class="cardBodyWrapper">
        <div class="ticketInfo">
            <h2>{{ $t("userKycForm.ticketHolderInfo") }}</h2>
            <p>{{ $t("userKycForm.ticketHolderInfoDesc") }}</p>
        </div>
    </div>
    <div class="bodyScroll user">
      <div v-for="(order, i) in ticketID.orderItem" :key="order" class="userForm"> 
          <div class="cardBodyInner" v-for="(ord, j) in order.ticket" :key="ord">
              <div class="cardBodyWrapper bgLight brdrtop">
                  <div class="ticketNewCategory">
                      <h2>
                          {{ $t("userKycForm.ticketCategory") }} {{ ord.ticketConfig.name }}
                          <div v-if="ord.ticketDiscount">
                              <span v-for="disc in ord.ticketDiscount" :key="disc.id">{{ $t("userKycForm.discountCategory") }}
                                  {{ disc.name }}</span>
                          </div>
                      </h2>
                      <div class="amount">
                          {{ ord.ticketConfig.faceValue }} {{ ord.ticketConfig.currency }}
                      </div>
                  </div>
              </div>
              <div class="cardBodyWrapper">
                  <div class="formInputs">
                      <div class="formGroup">
                          <input type="text" class="form-control" :class="
                    data.first_name[i + '' + j]
                      ? 'active '
                      : formErrors.first_name[i + '' + j]
                      ? ' errorInput'
                      : ''" v-model.trim="data.first_name[i + '' + j]" />
                          <div class="labelInput">{{ $t("userKycForm.firstName") }}</div>
                          <div v-if="
                    !data.first_name[i + '' + j] &&
                    formErrors.first_name[i + '' + j]
                  " class="error">
                              {{ $t("formValidation.firstName") }}
                          </div>
                      </div>
                      <div class="formGroup">
                          <input type="text" class="form-control" :class="
                    data.last_name[i + '' + j]
                      ? 'active'
                      : formErrors.last_name[i + '' + j]
                      ? ' errorInput'
                      : ''
                  " v-model.trim="data.last_name[i + '' + j]" />
                          <div class="labelInput">{{ $t("userKycForm.lastName") }}</div>
                          <div v-if="
                    !data.last_name[i + '' + j] &&
                    formErrors.last_name[i + '' + j]
                  " class="error">
                              {{ $t("formValidation.lastName") }}
                          </div>
                      </div>
                      <div class="formGroup">
                          <input type="text" class="form-control" :class="
                    data.phone[i + '' + j]
                      ? 'active'
                      : formErrors.phone[i + '' + j]
                      ? ' errorInput'
                      : ''
                  " v-model.trim="data.phone[i + '' + j]" @keypress="NumbersOnly"/>
                          <div class="labelInput">{{ $t("userKycForm.phone") }}</div>
                          <div v-if="
                    !data.phone[i + '' + j] &&
                    formErrors.phone[i + '' + j] != 'valid' &&
                    formErrors.phone[i + '' + j]
                  " class="error">
                              {{ $t("formValidation.phone") }}
                          </div>
                          <div v-else-if="
                    formErrors.phone[i + '' + j] == 'valid' &&
                    formErrors.phone[i + '' + j]
                  " class="error">
                              {{ $t("formValidation.validPhone") }}
                          </div>
                      </div>
                      <div class="formGroup">
                          <input type="email" class="form-control" :class="
                    data.email[i + '' + j]
                      ? 'active'
                      : formErrors.email[i + '' + j]
                      ? ' errorInput'
                      : ''
                  " v-model.trim="data.email[i + '' + j]" />
                          <div class="labelInput">{{ $t("userKycForm.email") }}</div>
                          <div v-if="
                    !data.email[i + '' + j] &&
                    formErrors.email[i + '' + j] != 'valid' &&
                    formErrors.email[i + '' + j]
                  " class="error">
                              {{ $t("formValidation.email") }}
                          </div>
                          <div v-else-if="
                    formErrors.email[i + '' + j] == 'valid' &&
                    formErrors.email[i + '' + j]
                  " class="error">
                              {{ $t("formValidation.validEmail") }}
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
    <div class="cardBodyWrapper">
        <div class="footerActionBtn">
            <button class="button btnBlack" @click.prevent="submit()">
                {{ $t("userKycForm.next") }}
            </button>
        </div>
    </div>
</template>

<script>
import { reactive, computed } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const formErrors = reactive({
      first_name: [null],
      last_name: [null],
      phone: [null],
      email: [null],
    });
    const data = reactive({
      first_name: [null],
      last_name: [null],
      phone: [null],
      email: [null],
    });
    const ticketID = computed(() => {
      return store.state.createdOrder;
    });

    function submit() {
      if (ticketHolder() == true) {
        store.dispatch("ticketHolderInfo", {
          orderItem: ticketID.value.orderItem,
          data,
        });
      }
    }

    /* Validation method */
    function ticketHolder() {
      let isValidForm = null;
      ticketID.value.orderItem.forEach((element, i) => {
        element.ticket.forEach((el, j) => {
          if (!data.first_name[i + "" + j]) {
            formErrors.first_name[i + "" + j] = true;
          }
          if (!data.last_name[i + "" + j]) {
            formErrors.last_name[i + "" + j] = true;
          }
          if (!data.phone[i + "" + j]) {
            formErrors.phone[i + "" + j] = true;
          } else if (
            !validPhone(data.phone[i + "" + j]) ||
            validPhone(data.phone[i + "" + j])
          ) {
            !validPhone(data.phone[i + "" + j])
              ? (formErrors.phone[i + "" + j] = "valid")
              : (formErrors.phone[i + "" + j] = true);
          }
          if (!data.email[i + "" + j]) {
            formErrors.email[i + "" + j] = true;
          } else if (!validEmail(data.email[i + "" + j])) {
            formErrors.email[i + "" + j] = "valid";
          } else {
            formErrors.email[i + "" + j] = true;
            isValidForm =
              element.ticket.length - 1 == j &&
              ticketID.value.orderItem.length - 1 == i
                ? true
                : false;
          }
        });
      });
      return isValidForm;
    } //end validation

    /* Regx checking for email and phone */

    function validEmail(email) {
      var re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }

    function validPhone(phone) {
      var re = /^(\+|\d)[0-9]{7,16}$/;
      return re.test(phone);
    }

     //end regx
     
    function NumbersOnly(evt) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault()
      } else {
        return true
      }
    }

   

    return {
      data,
      formErrors,
      ticketHolder,
      ticketID,
      validEmail,
      validPhone,
      submit,
      NumbersOnly
    };
  },
};
</script>
