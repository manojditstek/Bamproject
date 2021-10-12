<template>
<div class="d-flex justify-content-between align-items-end">
    <div class="alert">
        <p>
            <i class="fa fa-exclamation-triangle" aria-hidden="true"></i> have 9:23 minutes to complete your order
        </p>
    </div>
</div>
<!--step1-->
<div class="cardBodyWrapper">
    <div class="innerHeading">
        <h4>Personal Data</h4>
    </div>
    <div class="formInputs">
        <div class="formGroup">
            <input type="text" class="form-control" v-model.trim="data.first_name" />
            <div class="labelInput">First Name</div>
            <label>{{formErrors[0]}}</label>
        </div>
        <div class="formGroup">
            <input type="text" class="form-control" v-model.trim="data.last_name" />
            <div class="labelInput">Label</div>
            <label>{{formErrors[1]}}</label>
        </div>
        <div class="formGroup">
            <input type="number" class="form-control" v-model.trim="data.phone" />
            <div class="labelInput">Label</div>
            <label>{{formErrors[2]}}</label>
        </div>
    </div>
    <div class="formInputs">
        <div class="formGroup">
            <label>This Email will be used for your invoice</label>
            <div class="formLabel">
                <input type="email" class="form-control" v-model.trim="data.email" />
                <div class="labelInput">Label</div>
                <label>{{formErrors[3]}}</label>
            </div>
        </div>
        <div class="formGroup">
            <div class="checkbox">
                <input type="checkbox" id="html" :value="true" v-model="checkMail" />
                <label for="html"></label>
            </div>
            <label>Use the same as Billing Email</label>
            <div class="formLabel">
                <input v-if="checkMail" type="email" class="form-control" v-model.trim="data.email" />
                <input v-else type="email" class="form-control" v-model.trim="data.delivery_email" />
                <div class="labelInput">Label</div>
                <label>{{formErrors[4]}}</label>
            </div>
        </div>
    </div>
    <div class="footerActionBtn btns">
        <button class="button" @click="validation()">PAY {{totalPrice}} {{currency}}</button>
        <router-link to="/" class="button btnGray">Cancel</router-link>
    </div>
</div>
</template>

<script>
import {
    ref,
    reactive,
    computed,
    watchEffect,
    watchPostEffect
} from "vue";
import {
    useRouter
} from "vue-router";
import {
    useStore
} from 'vuex';
export default {
    name: 'UserForm',

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
            delivery_email: null,

        })

        const totalPrice = computed(() => {
            return store.state.cart.itemTotalAmount;
        });
        let currency = computed(function () {
            return store.state.currency
        });

        function payMethod() {
            router.push({
                path: '/payment'
            })
        }

        function validation() {
              formErrors.value = [];
            if (!data.first_name) {
                formErrors.value[0] = "First name required.";
            }
            if (!data.last_name) {
                formErrors.value[1] = "Last name required.";
            }
            if (!data.phone) {
                formErrors.value[2] = "Phone required.";
            } else if (!validPhone(data.phone)) {
                formErrors.value[2] = 'Valid phone number required.';
            }
            if (!data.email) {
                formErrors.value[3] = 'Email required.';
            } else if (!validEmail(data.email)) {
                formErrors.value[3] = 'Valid email required.';
            }
            if (!checkMail.value && !data.delivery_email) {
                formErrors.value[4] = 'Email required.';
            } else if (!checkMail.value && !validEmail(data.delivery_email)) {
                formErrors.value[4] = 'Valid email required.';
            }

            if (!formErrors.value.length) {
                //store.dispatch('createOrder', data);
                router.push({
                    path: '/payment'
                })
            }
            return false
        }

        function validEmail(email) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }

        function validPhone(phone) {
            var re = /^\s*(?:\+?(\d{1,3}))?[- (]*(\d{3})[- )]*(\d{3})[- ]*(\d{4})(?: *[x/#]{1}(\d+))?\s*$/;
            return re.test(phone);
        }

        return {
            data,
            checkMail,
            payMethod,
            totalPrice,
            currency,
            formErrors,
            validation,
            validEmail,
            validPhone
        }
    },

}
</script>
