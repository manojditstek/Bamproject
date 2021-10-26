<template>
    <div class="mainWrapper">
        <div class="contentWraper">
                <error-message />
                <router-view />
        </div>
    </div>
</template>

<script>
import axios from "axios";
// import SwitchLanguage from "@/views/SwitchLanguage.vue";
import {
    computed
} from 'vue'
// import state from './store/index'
// import {
//     BAM
// } from 'bam-ticketing-sdk';
import {
    useStore
} from "vuex";
import ErrorMessage from './components/errorMessages/ErrorMessages.vue'
export default {
    name: "app",

    setup() {
         const store = useStore();
        //provide('store', state)

         const errorMsg = computed(() => {
            return store.state.errorMsg;
        });

        function closeAlert() {
            store.state.errorMsg = '';
        }

        return{
            errorMsg,
            closeAlert
        }
    },
    components: {
        // SwitchLanguage,
        ErrorMessage
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
                // console.log(response.data.data.token);
                return response.data;
              });
        },
    },
};
</script>
<style> 
</style>
