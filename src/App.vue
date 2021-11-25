<template>
  <div class="mainWrapper">
    <div class="contentWraper">
      <Loader />
      <div class="contentInnerWraper">
        <p>{{ fields }}</p>
        <error-message />
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import ErrorMessage from "./components/errorMessages/ErrorMessages.vue";
import Loader from './components/loader/Loader.vue';
export default {
  name: "app",
  props: {
    fields: { type: Object }
  },
  
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
    ErrorMessage,
    Loader
  },
};
</script>

<style>

</style>

