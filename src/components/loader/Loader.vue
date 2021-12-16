<template>
<div v-if="loaderStatus" class="loader">
    <div class="loaderWrapper ">
        <!-- <img src="@/assets/images/loading-buffering.gif" alt="Image"> -->
        <!-- <i class="fa fa-spinner" aria-hidden="true"></i> -->
        <!-- <i class="fa fa-circle-o-notch" aria-hidden="true"></i> -->
        <div class="loaderInner"></div>
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
