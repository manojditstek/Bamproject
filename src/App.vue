<template>
  <div class="mainWrapper">
    <div class="contentWraper">
      <Loader/>
      <div class="contentInnerWraper">
        <error-message />
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, provide,} from "vue";
import { useStore } from "vuex";
import ErrorMessage from "./components/errorMessages/ErrorMessages.vue";
import Loader from './components/loader/Loader.vue';
export default {
  name: "app",
  props:{
    event_id: { type: String },
    organizer_id:{type:String},
    domain:{type:String}
  },
  setup(props,{attrs}) {
    const store = useStore();
    provide('eventID', props.event_id)
    store.commit('eventID',props.event_id)
    store.commit('organizerID',props.organizer_id)
    store.commit('domainURL',props.domain)
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

