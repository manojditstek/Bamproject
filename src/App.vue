<template>
 <div  class="contentWraper">
    <!-- <div id="nav">
      <router-link to="/">{{ $t("message.home") }}</router-link> |
      <router-link to="/about">{{ $t("message.about") }}</router-link> |
    </div> -->
    <!-- <div class="text-center">
       <switchLanguage />
    </div> -->

  <div class="contentInnerWraper">
    
     <router-view />
  </div>
    </div>
</template>
<script>
import axios from "axios";
// import SwitchLanguage from "@/views/SwitchLanguage.vue";
import {provide} from 'vue'
import state from './store/index'
export default {
  name: "app",

  setup(){
    provide('store',state)
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
    login() {
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


