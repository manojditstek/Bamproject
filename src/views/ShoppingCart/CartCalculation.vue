<template>
    <div class="collapse" @click="toggleButton=!toggleButton">
        <div class="collapseInner"></div>
    </div>
     <div class="expand d-flex" v-show="toggleButton">
        <TotalTicketCalculation />
        <CartButton />
    </div>
</template>
<script>
import TotalTicketCalculation from "../../components/cartModule/TotalTicketCalculation";
import CartButton from "../../components/cartModule/CartButton";
import { ref } from "vue";
export default {
    name: 'ShoppingCart',
    components: {
        TotalTicketCalculation,
        CartButton
    },
    setup(){
        const toggleButton = ref(false);
        return{
            toggleButton
        }
    }
}
</script>
