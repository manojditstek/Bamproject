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
          <input type="text" class="form-control" v-model="data.first_name" />
          <div class="labelInput">First Name</div>
        </div>
        <div class="formGroup">
          <input type="text" class="form-control" v-model="data.last_name" />
          <div class="labelInput">Label</div>
        </div>
        <div class="formGroup">
          <input type="number" class="form-control" v-model.number="data.phone" />
          <div class="labelInput">Label</div>
        </div>
      </div>
      <div class="formInputs">
        <div class="formGroup">
          <label>This Email will be used for your invoice</label>
          <div class="formLabel">
            <input type="email" class="form-control" v-model="data.email" />
            <div class="labelInput">Label</div>
          </div>
        </div>
        <div class="formGroup"> 
          <div class="checkbox">
            <input type="checkbox" id="html" v-model="checkMail" />
            <label for="html"></label>
          </div>
          <label>Use the same as Billing Email</label>
          <div class="formLabel">
            <input v-if="checkMail" type="email" class="form-control" v-model="data.email" />
            <input v-else type="email" class="form-control" v-model="data.delivery_email" />
            <div class="labelInput">Label</div>
          </div>
        </div>
      </div>
      <div class="footerActionBtn btns">
        <router-link to="/delivery-method" class="button">PAY 225,00 EUR</router-link>
        <router-link to="/delivery-method" class="button btnGray">Cancel</router-link>
      </div>
    </div>
    <!--step2-->
    <div class="cardBodyWrapper">
      <div class="innerHeading">
        <h4>Payment</h4>
      </div>
      <div class="inputWrapper payment">
        <div class="inputInnerWrapper">
          <div class="inputGroup">
            <input type="radio" id="test1" name="delMethod" checked />
            <label for="test1"></label>
          </div>
          <h4>Credit Card</h4>
        </div>
        <div class="inputInnerWrapper">
          <div class="inputGroup">
            <input type="radio" id="test2" name="delMethod" checked />
            <label for="test2"></label>
          </div>
          <h4>EPS</h4>
        </div>
      </div>
      <div class="hr"></div>
      <div class="formInputs">
        <div class="formGroup">
          <input type="text" class="form-control" v-model="data.first_name" />
          <div class="labelInput">First Name</div>
        </div>
        <div class="formGroup space">
            <div class="formGroup">
            <input type="text" class="form-control" placeholder="MM/JJ" v-model="data.last_name" />
            </div>
            <div class="formGroup">
            <input type="number" class="form-control" placeholder="Prufziffer" v-model.number="data.phone" />
            </div>
        </div>
        
      </div>
      <div class="footerActionBtn btns">
        <router-link to="/delivery-method" class="button">PAY 225,00 EUR</router-link>
        <router-link to="/delivery-method" class="button btnGray">Cancel</router-link>
      </div>
    </div>
    <!--step3-->
    <div class="cardBodyWrapper">
      <div class="innerHeading">
        <h4>Payment</h4>
      </div>
      <div class="inputWrapper payment">
        <div class="inputInnerWrapper">
          <div class="inputGroup">
            <input type="radio" id="test1" name="delMethod" checked />
            <label for="test1"></label>
          </div>
          <h4>Credit Card</h4>
        </div>
        <div class="inputInnerWrapper">
          <div class="inputGroup">
            <input type="radio" id="test2" name="delMethod" checked />
            <label for="test2"></label>
          </div>
          <h4>EPS</h4>
        </div>
      </div>
      <div class="hr"></div>
      <div class="formInputs">
        <div class="formGroup">
          <input type="text" class="form-control" placeholder="Account Holder Name" v-model="data.first_name" />
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
      <div class="footerActionBtn btns">
        <router-link to="/delivery-method" class="button">PAY 225,00 EUR</router-link>
        <router-link to="/delivery-method" class="button btnGray">Cancel</router-link>
      </div>
    </div>
</template>

<script>
import {
    ref,
    reactive
} from "vue";
export default {
    name: 'UserForm',

    setup() {
        const checkMail = ref(false)
        const data = reactive({
            first_name: null,
            last_name: null,
            phone: null,
            email: null,
            confirm_email: null

        })

        return {
            data,
            checkMail
        }
    }

}
</script>
