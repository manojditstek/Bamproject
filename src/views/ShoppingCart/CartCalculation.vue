<template>
    <div class="collapse" @click.prevent="toggle()">
        <div class="collapseInner"></div>
    </div>
     <div class="expand d-flex" v-if="toggleButton">
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
        const toggleButton = ref(true);
        function toggle(){
            return toggleButton.value=!toggleButton.value
        }
        return{
            toggleButton,
            toggle
        }
    }
}
</script>
