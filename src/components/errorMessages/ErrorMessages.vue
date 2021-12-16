<template>
<div v-if="errorMsg" class=" alert-danger alert-dismissible">
    <button type="button" class="close" @click="closeAlert" data-dismiss="alert">&times;</button>
    {{errorMsg.message}}
</div>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "ErrorMessages",
  setup() {
    const store = useStore();
    const errorMsg = computed(() => {
      return store.state.errorMsg;
    });
    function closeAlert() {
      store.state.errorMsg = null;
    }
    return {
      errorMsg,
      closeAlert,
    };
  },
};
</script>

<style>
</style>
