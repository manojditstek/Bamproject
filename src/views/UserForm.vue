<template>
<div class="labelBtn">
    <router-link to="/delivery-method">
        <button>
            Back
        </button>
    </router-link>
</div>
<div>
    <h4>Personal Details</h4>
</div>
<div>
    <div>
        <label for="">First Name</label>
        <input type="text" v-model="data.first_name" />
    </div>
    <div>
        <label for="">Last Name</label>
        <input type="text" v-model="data.last_name" />
    </div>
    <div>
        <label for="">Phone Name</label>
        <input type="number" v-model.number="data.phone" />
    </div>
    <div>
        <label for="">This Email will be used for your invoice</label>
        <input type="email" v-model="data.email" />
    </div>
    <div>
        <input type="checkbox" v-model="checkMail">
        <label for="">Use the same as Billing Email</label>
        <input v-if="checkMail" type="email" v-model="data.email" />
        <input v-else type="email" v-model="data.delivery_email" />
    </div>
</div>

<router-link to="/payment" class="button">
    <button type="button">
        Next
    </button>
</router-link>
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
