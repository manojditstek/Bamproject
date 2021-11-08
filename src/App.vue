<template>
  <div class="mainWrapper">
     
    <div class="contentWraper">
      <Loader />
      <!-- <div class="text-center">
            <switchLanguage />
        </div> -->
      <div class="contentInnerWraper">
        <!-- This error component used for display server side error message -->
        <error-message />
        <!-- end -->
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
// import SwitchLanguage from "./views/Localization/SwitchLanguage.vue";
import { computed } from "vue";
import { useStore } from "vuex";
import ErrorMessage from "./components/errorMessages/ErrorMessages.vue";
import Loader from './components/loader/Loader.vue'
export default {
  name: "app",
  setup() {
    const store = useStore();
    const errorMsg = computed(() => {
      return store.state.errorMsg;
    });

    function closeAlert() {
      store.state.errorMsg = "";
    }

    return {
      errorMsg,
      closeAlert,
    };
  },
  components: {
    // SwitchLanguage,
    ErrorMessage,
    Loader
  },
};
</script>

