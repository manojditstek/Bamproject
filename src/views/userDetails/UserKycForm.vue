<template>
<div>
    <!-- step 1 -->
    <div class="d-flex justify-content-between align-items-end header">
        <h2>
            <router-link to="/shop">
            <i class="fa fa-angle-left" aria-hidden="true"></i>
           {{ $t('cartTemp.cart') }}
            </router-link>
        </h2>
    </div>
    <!---->
    <div class="cardBodyWrapper">
        <div class="ticketInfo">
            <h1>{{$t('userKycForm.ticketHolderInfo')}}</h1>
            <p>{{$t('userKycForm.ticketHolderInfoDesc')}}</p>
        </div>
    </div>
    <!---->
    <div class="cardBodyInner" v-for="(order,i) in ticketID.orderItem" :key="order">
      <div class="cardBodyWrapper bgLight brdrtop">
          <!-- <div class="ticketCategory" v-for=" item in cart.cartItems" :key="item.id"> -->
              <div class="ticketNewCategory">
              <h2>{{$t('userKycForm.ticketCategory')}}{{order.ticket[0].ticketConfig.name}}<span>{{$t('userKycForm.discountCategory')}}{{}}</span></h2>
              <div class="amount">{{order.ticket[0].ticketConfig.faceValue}} {{order.ticket[0].ticketConfig.currency}}</div>
          </div>
      </div>
      <div class="cardBodyWrapper">
          <div class="formInputs">
              <div class="formGroup">
                  <input type="text" class="form-control " :class="data.first_name[i]?'active ':formErrors.first_name[i]?' errorInput':''" v-model.trim="data.first_name[i]"  />
                  <div class="labelInput">{{$t('userKycForm.firstName')}}</div>
                  <div v-if="!data.first_name[i] && formErrors.first_name[i] " class="error">{{$t('formValidation.firstName')}}</div>
              </div>
              <div class="formGroup">
                  <input type="text" class="form-control" :class="data.last_name[i]?'active':formErrors.last_name[i]?' errorInput':''" v-model.trim="data.last_name[i]"  />
                  <div class="labelInput">{{$t('userKycForm.lastName')}}</div>
                  <div v-if="!data.last_name[i] && formErrors.last_name[i]" class="error">{{$t('formValidation.lastName')}}</div>
              </div>
              <div class="formGroup">
                  <input type="number" class="form-control" :class="data.phone[i] ?'active':formErrors.phone[i]?' errorInput':''" v-model.trim="data.phone[i]" />
                  <div class="labelInput">{{$t('userKycForm.phone')}}</div>
                  <div v-if="formErrors.phone[i]"  class="error">{{$t('formValidation.phone')}}</div>
              </div>
              <div class="formGroup">
                  <input type="email" class="form-control" :class="data.email[i] ?'active':formErrors.email[i]?' errorInput':''" v-model.trim="data.email[i]"  />
                  <div class="labelInput">{{$t('userKycForm.email')}}</div>
                  <div v-if="formErrors.email[i] !='valid' && formErrors.email[i]" class="error">{{$t('formValidation.email')}}</div>
                   <div v-if="formErrors.email[i]=='valid'" class="error">{{$t('formValidation.validEmail')}}</div>
              </div>
          </div>
      </div>
    </div>
     <!---->
    <div class="cardBodyWrapper">
        <div class="footerActionBtn">
            <button class="button" @click="ticketHolder">{{$t('userKycForm.next')}}</button>
        </div>
    </div>

</div>
</template>

<script>
import {ref,reactive,computed,} from "vue";
// import {useRouter} from "vue-router";
import {useStore} from 'vuex';
export default {
    setup() {
        // const router = useRouter();
        const store = useStore();
        const formErrors = ref({
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
        })

        
        const ticketID = computed(()=>{
            // return store.state.createdOrder.orderItem[0].ticket[0].id;
            return store.state.createdOrder;
        })
        function ticketHolder() {
            // store.dispatch('ticketHolderInfo', {orderItem:ticketID.value.orderItem,data})
          
           ticketID.value.orderItem.forEach((element,i)=> {
                if(!data.first_name[i]){
                     formErrors.value.first_name[i] = true;
                }else if (!data.last_name[i]) {
                    formErrors.value.first_name[i] =''
                    formErrors.value.last_name[i] = true;
                }else if(!data.phone[i]){
                    formErrors.value.last_name[i]=''
                     formErrors.value.phone[i] = true;
                }
                else if(!data.email[i]){
                    formErrors.value.phone[i] =''
                    formErrors.value.email[i] = true;
                }else if (!validEmail(data.email[i])) {
                    formErrors.value.phone[i] =''
                    formErrors.value.email[i] = 'valid';
                }
                
                else if(ticketID.value.orderItem.length-1==i){
                     formErrors.value.email[i] =''
                    console.log('submitted')
                    store.dispatch('ticketHolderInfo', {orderItem:ticketID.value.orderItem,data})
                }   
                else if(data.email[i]){
                    formErrors.value.email[i] =''
                    return true;
                }else if (validEmail(data.email[i])) {
                    formErrors.value.email[i] = '';
                    return true;
                }

                 
            });
   
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
            ticketHolder,
            ticketID,
            validEmail,
            validPhone,
         
           
        }
    }
};
</script>
