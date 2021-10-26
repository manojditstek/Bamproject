<template>
<div class="d-flex justify-content-between align-items-end">
    <div class="alert">
        <Timer />
    </div>
</div>
<!--step1-->
<div class="cardBodyWrapper">
    <Loader />
    <div class="innerHeading">
        <h4>Personal Data</h4>
    </div>
    <div class="formInputs">
        <div class="formGroup">
            <input type="text" class="form-control " :class="data.first_name?'active ':formErrors[0]?' errorInput':''" v-model.trim="data.first_name" @input="firstName()"  />
            <div class="labelInput">First Name</div>
            <div class="error" >{{formErrors[0]}}</div>
        </div>
        <div class="formGroup">
            <input type="text" class="form-control" :class="data.last_name?'active':formErrors[1]?' errorInput':''" v-model.trim="data.last_name"  @input="lastName()"/>
            <div class="labelInput">Last Name</div>
            <div class="error">{{formErrors[1]}}</div>
        </div>
        <div class="formGroup">
            <input type="number" class="form-control" :class="data.phone && !formErrors[2]?'active':formErrors[2]?' errorInput':''" v-model.trim="data.phone" @input="phoneNumber()"/>
            <div class="labelInput">Phone</div>
           <div  class="error">{{formErrors[2]}}</div>
        </div>
    </div>
    <div class="formInputs">
        <div class="formGroup">
            <label>This Email will be used for your invoice</label>
            <div class="formLabel">
                <input type="email" class="form-control" :class="data.email && !formErrors[3]?'active':formErrors[3]?' errorInput':''" v-model.trim="data.email" @input="emailCheck()"/>
                <div class="labelInput">Email</div>
                <div  class="error">{{formErrors[3]}}</div>
            </div>
        </div>
        <div class="formGroup">
            <div class="checkbox">
                <input type="checkbox" id="html" :value="true" v-model="checkMail" />
                <label for="html"></label>
            </div>
            <label>Use the same as Billing Email</label>
            <div class="formLabel">
                <input v-if="checkMail" type="email" class="form-control" :class="data.email && !formErrors[3]?'active':formErrors[3]?' errorInput':''" v-model.trim="data.email" />
                <input v-else type="email" class="form-control" :class="data.billing_email && !formErrors[4]?'active':formErrors[4]?' errorInput':''" v-model.trim="data.billing_email" @input="deliveryMail()"/>
                <div class="labelInput">Email</div>
               <div v-if="!checkMail" class="error">{{formErrors[4]}}</div>
            </div>
        </div>
    </div>
    <div class="footerActionBtn btns">
        <button class="button" @click="payMethod()">PAY {{totalPrice}} {{currency}}</button>
        <router-link to="/" class="button btnGray">Cancel</router-link>
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
import Timer from '../../components/CountDownTimer.vue'
import Loader from '../../components/loader/Loader'
export default {
    name: 'UserForm',
    components:{
        Timer,
        Loader
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

        })

        const totalPrice = computed(() => {
            return store.state.cart.itemTotalAmount;
        });
        let currency = computed(()=> {
            return store.state.currency
        });

        let orderID = computed(()=>{
            return store.state.createdOrder;
        })
         let payTicketType = orderID.value.order_item.filter((item)=>item.ticket[0].ticket_config.face_value>0);

        function payMethod() {
            if(firstName()==true && lastName()==true && phoneNumber()==true && emailCheck()==true && deliveryMail()==true){
                 store.dispatch('orderContact', {
                id:orderID.value.id,
                data
            })
           if(payTicketType.length>0){
               router.push({
                path: '/payment'
            })
           }else{
            router.push({
                path: '/download-ticket'
            })
           }
            }
            else{
                return false
            }
            
        }

        function firstName(){
            formErrors.value = [];
            if (!data.first_name) {
                formErrors.value[0] = "First name required.";
            }else{
                return true
            }
        }

        function lastName(){
            formErrors.value = [];
            if (!data.last_name) {
                formErrors.value[1] = "Last name required.";
            }else{
                return true
            }
        }

        function phoneNumber(){
            formErrors.value = [];
            if (!data.phone) {
                formErrors.value[2] = "Phone required.";
            }
            else if (!validPhone(data.phone)) {
                formErrors.value[2] = 'Valid phone number required.';
            }
            else{
                return true
            }
        }

        function emailCheck(){
            formErrors.value = [];
           if (!data.email) {
                formErrors.value[3] = 'Email required.';
            }else if (!validEmail(data.email)) {
                formErrors.value[3] = 'Valid email required.';
            }else{

                return true
            } 
        }

        function deliveryMail(){
            formErrors.value = [];
            if (!checkMail.value && !data.billing_email) {
                formErrors.value[4] = 'Email required.';
            } else if (!checkMail.value && !validEmail(data.billing_email)) {
                formErrors.value[4] = 'Valid email required.';
            }else{
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
            orderID
        }
    },

}
</script>
