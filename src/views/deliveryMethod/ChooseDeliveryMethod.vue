<template>
<!-- step 1 -->
<div class="d-flex justify-content-between align-items-end header">
    <h2>
        <router-link to="/shop">
            <i class="fa fa-angle-left" aria-hidden="true"></i>
            Cart
        </router-link>
    </h2>
    <div class="datePicker"></div>
</div>
<!---->
<div class="cardBodyWrapper">
    <div class="innerHeading">
        <h4>Delivery Methods</h4>
        <p>Secure digital ticket or the old-school way?</p>
    </div>
    <div class="inputWrapper">
        <div class="inputInnerWrapper" :class="delMethod==true ?'active':''">
            <div class="inputGroup">
                <input type="radio" id="test1" name="delMethod" :value="true" v-model="delMethod">
                <label for="test1"></label>
            </div>
            <h4>BAM Tickets</h4>
            <p>Compatible with your B.A.M Wallet App. Please prepare your smartphone for the next step.</p>
        </div>
        <div class="inputInnerWrapper" :class="delMethod==false ?'active':''">
            <div class="inputGroup">
                <input type="radio" id="test2" name="delMethod" :value="false" v-model="delMethod" checked>
                <label for="test2"></label>
            </div>
            <h4>PDF/PK PASS</h4>
            <p>Use with any iOS and Android App that supports pkpass files or print your tickets at home.</p>
        </div>
    </div>
    <div class="footerActionBtn"><router-link to="/user-form" class="button">CONFIRM</router-link></div>
    <!-- <router-link to="/user-form" class="button"><button type="button"> CONFIRM </button></router-link> -->

</div>
<!---->
</template>

<script>
import {
    ref,
} from "vue";

export default {
    setup() {
        const delMethod = ref(false);
        return {
            delMethod,
        };
    }
};
</script>

