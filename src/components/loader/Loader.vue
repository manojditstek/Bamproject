<template>
<div v-if="loaderStatus" class="loader">
    <div class="loaderWrapper ">
        <img src="assets/images/loading-buffering.gif" alt="Image">
    </div>
</div>
</template>

<script>
import {computed} from "vue";
import {useStore} from "vuex";
export default {
    name: 'Loader',
    setup() {
        const store = useStore();
         
        const loaderStatus = computed(() => {
            return store.state.loadingStatus;
        });
        return {
            loaderStatus
        }
        
    }
}
</script>
