<template>
<p>
    <i class="fa fa-exclamation-triangle" aria-hidden="true"></i> {{$t('timer.have')}} {{countDown}} {{$t('timer.afterHave')}}
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
        watchEffect(() => {
            setTimeout(async () => {
                await store.dispatch('startTimer');
            },1000)
        })

        return {
            countDown,
        }
    }
}
</script>
