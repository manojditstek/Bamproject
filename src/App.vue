<template>
<div class="contentWraper">
    <!-- <div id="nav">
      <router-link to="/">{{ $t("message.home") }}</router-link> |
      <router-link to="/about">{{ $t("message.about") }}</router-link> |
    </div> -->
    <!-- <div class="text-center">
       <switchLanguage />
    </div> -->

    <div class="contentInnerWraper">
        <div v-if="errorMsg" class=" alert-danger alert-dismissible">
            <button type="button" class="close" data-dismiss="alert">&times;</button>
             {{errorMsg.message}} 
        </div>
        <!-- <h3 v-if="errorMsg" class="errorMsg"> {{errorMsg.message}} </h3> -->

        <router-view />
    </div>
</div>
</template>

<script>
import axios from "axios";
// import SwitchLanguage from "@/views/SwitchLanguage.vue";
import {
    provide,computed
} from 'vue'
import state from './store/index'
import {
    BAM
} from 'bam-ticketing-sdk';
import {
    useStore
} from "vuex";
export default {
    name: "app",

    setup() {
         const store = useStore();
        //provide('store', state)

         const errorMsg = computed(() => {
            return store.state.errorMsg;
        });

        return{
            errorMsg
        }
    },
    components: {
        // SwitchLanguage,
    },
    mounted() {
        console.log(process.env.VUE_APP_ROOT_API);
    },
    created() {
        this.login();
    },
    methods: {
        async login() {
            // const bam = new BAM()
            // let auth = await bam.auth.guestLogin()
            // console.log('sdkAuthToken:', auth.token)
            // localStorage.setItem("token", auth.token);

            axios
              .post("https://develop.bam.fan/account/v1/guest/login")
              .then((response) => {
                localStorage.setItem("token", response.data.data.token);
                console.log(response.data.data.token);
                return response.data;
              });
        },
    },
};
</script>
<style>
    .errorMsg{
        color: rgb(245, 3, 3);
        text-align: center;
    }
</style>
