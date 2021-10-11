<template>

<Cart />

</template>

<script>
// import CartItem from "../components/CartItem.vue";
import Cart from "../../components/cartModule/Cart.vue";
import {
    computed
} from "vue";
import {
    useStore
} from "vuex";

export default {
    name: 'ShoppingCart',
    components: {
        Cart
    },
    setup() {
        const store = useStore();

        let cart = computed(function () {
            return store.state.cart
        });

        return {
            cart
        }
    }
}
</script>
