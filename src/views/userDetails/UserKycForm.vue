<template>
<div>
    <!-- step 1 -->
    <div class="d-flex justify-content-between align-items-end header">
        <h2>
            <router-link to="/shop">
            <i class="fa fa-angle-left" aria-hidden="true"></i>
            Cart
            </router-link>
        </h2>
    </div>
    <!---->
    <div class="cardBodyWrapper">
        <div class="ticketInfo">
            <h1>Ticket Holder Information</h1>
            <p>Donec id elit non mi porta gravida at eget metus. Morbi leo risus, porta consectetur vestibulum.</p>
        </div>
    </div>
    <!---->
    <div class="cardBodyInner">
      <div class="cardBodyWrapper bgLight brdrtop">
          <!-- <div class="ticketCategory" v-for=" item in cart.cartItems" :key="item.id"> -->
              <div class="ticketCategory">
              <h2>Ticket Category:<span>Discount Category:</span></h2>
              <div class="amount"></div>
          </div>
      </div>
      <div class="cardBodyWrapper">
          <div class="formInputs">
              <div class="formGroup">
                  <input type="text" class="form-control " :class="data.first_name?'active ':formErrors[0]?' errorInput':''" v-model.trim="data.first_name" @input="firstName()" />
                  <div class="labelInput">First Name</div>
                  <div class="error">{{formErrors[0]}}</div>
              </div>
              <div class="formGroup">
                  <input type="text" class="form-control" :class="data.last_name?'active':formErrors[1]?' errorInput':''" v-model.trim="data.last_name" @input="lastName()" />
                  <div class="labelInput">Last Name</div>
                  <div class="error">{{formErrors[1]}}</div>
              </div>
              <div class="formGroup">
                  <input type="number" class="form-control" :class="data.phone && !formErrors[2]?'active':formErrors[2]?' errorInput':''" v-model.trim="data.phone" @input="phoneNumber()" />
                  <div class="labelInput">Phone</div>
                  <div class="error">{{formErrors[2]}}</div>
              </div>
              <div class="formGroup">
                  <input type="email" class="form-control" :class="data.email && !formErrors[3]?'active':formErrors[3]?' errorInput':''" v-model.trim="data.email" @input="emailCheck()" />
                  <div class="labelInput">Email</div>
                  <div class="error">{{formErrors[3]}}</div>
              </div>
          </div>
      </div>
    </div>
     <!---->
    <div class="cardBodyWrapper">
        <div class="footerActionBtn">
            <button class="button" @click="createOrder">Next</button>
        </div>
    </div>

</div>
</template>

<script>
import {
    ref,
    reactive,
    computed,
} from "vue";
import {
    useRouter
} from "vue-router";
import {
    useStore
} from 'vuex';
export default {
    setup() {
        const router = useRouter();
        const store = useStore();
        const formErrors = ref([]);
        const data = reactive({
            first_name: null,
            last_name: null,
            phone: null,
            email: null,
        })

        let cart = computed(function () {
            return store.state.cart
        });

        let ticketFormat = computed(function () {
            return store.state.ticketFormat
        });

        function createOrder() {
            if (firstName() == true && lastName() == true && phoneNumber() == true && emailCheck() == true) {
                let cartItems = cart.value.cartItems.map(elementKey => ({
                    ticket_config_id: elementKey.id,
                    quantity: elementKey.quantity,
                    timeslot_id: elementKey.timeSlotId
                }));
                let format = ticketFormat.value
                store.dispatch('createOrder', {
                    cartItems,
                    format,
                    data
                })

            }
        }

        function firstName() {
            formErrors.value = [];
            if (!data.first_name) {
                formErrors.value[0] = "First name required.";
            } else {
                return true
            }
        }

        function lastName() {
            formErrors.value = [];
            if (!data.last_name) {
                formErrors.value[1] = "Last name required.";
            } else {
                return true
            }
        }

        function phoneNumber() {
            formErrors.value = [];
            if (!data.phone) {
                formErrors.value[2] = "Phone required.";
            } else if (!validPhone(data.phone)) {
                formErrors.value[2] = 'Valid phone number required.';
            } else {
                return true
            }
        }

        function emailCheck() {
            formErrors.value = [];
            if (!data.email) {
                formErrors.value[3] = 'Email required.';
            } else if (!validEmail(data.email)) {
                formErrors.value[3] = 'Valid email required.';
            } else {

                return true
            }
        }

        function validEmail(email) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }

        function validPhone(phone) {
            var re = /^\s*(?:\+?(\d{1,1}))?[- (]*(\d{3})[- )]*(\d{3})[- ]*(\d{4})(?: *[x/#]{1}(\d+))?\s*$/;
            return re.test(phone);
        }

        return {
            data,
            formErrors,
            validEmail,
            validPhone,
            firstName,
            lastName,
            phoneNumber,
            emailCheck,
            createOrder,
            cart,
            ticketFormat

        }
    }
};
</script>
