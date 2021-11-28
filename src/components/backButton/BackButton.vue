<template>
  <a href="javascript:void(0)" @click="backToHome">
    <i v-if="message != 'back'" class="fa fa-angle-left" aria-hidden="true"></i>
    {{ $t(`common.${message}`) }}
  </a>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
export default {
  name: "BackButton",
  props: {
    message: String,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    function backToHome() {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you want to cancel your current tickets in cart?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          // store.commit("backToHome");
          store.state.cart.cartItems = [];
          store.state.cart.itemsTotalQuantity = 0;
          store.state.cart.itemTotalAmount = 0;
          store.state.errorMsg = null;
          router.push({
            path: "/",
          });
        }
      });
    }
    return {
      backToHome,
    };
  },
};
</script>
