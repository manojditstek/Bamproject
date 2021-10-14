<template>
    <p>
        <i class="fa fa-exclamation-triangle" aria-hidden="true"></i> have {{countDown}} minutes to complete your order
    </p>
</template>

<script>
import {
    useStore
} from 'vuex';
import {
    watchEffect,
    computed
} from '@vue/runtime-core'
export default {
    name: 'CountDownTimer',

    setup() {
        const store = useStore();
        const countDown = computed(() => {
            return store.state.timerDispaly;
        })
        watchEffect(async () => {
            await store.dispatch('startTimer');
        })

        
        return {
            countDown,
        }
    }
}
</script>
