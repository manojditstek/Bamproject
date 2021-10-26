<template>
<div class="ticketCol">
    <h3>{{ $t('cartTemp.tickets') }}</h3>
    <h2>{{totalQuantity}}</h2>
</div>
<div class="ticketCol">
    <h3>{{$t('cartTemp.total_amount')}}</h3>
    <h2>{{totalPrice}} {{currency}}</h2>
</div>
</template>

<script>
import {
    useStore
} from "vuex"
import {
    computed,
} from "vue"
export default {
    name: 'TotalTicketCalculation',

    setup() {
        const store = useStore();

        let currency = computed(function () {
            return store.state.currency
        });

        const totalPrice = computed(() => {
            return store.state.cart.itemTotalAmount;
        });

        const totalQuantity = computed(() => {
            return store.state.cart.itemsTotalQuantity;
        });

        return {
            totalPrice,
            totalQuantity,
            currency
        }
    },

}
</script>

<style>

</style>
