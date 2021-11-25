<template>
  <div class="cardWrapper d-flex">
    <div class="detailsCol pad-0">
      <h2>{{ discount.name }}:{{ discount.value }} {{ "EUR" }}</h2>
      <div class="priceWrap d-flex">
        <div class="eventPrice1">
          <small>{{ $t("common.fees") }} € 0.00</small>
          <small>{{ $t("common.total") }} € 0.00</small>
        </div>
        <div class="ticketMessage" v-if="ticket.availableTickets == ''">
          <div
            class="ticketMessageInner"
            :class="discount.availableTickets != '' ? '' : 'soldOut'"
          >
            {{ discount.availableTickets != "" ? "" : $t("common.soldOut") }}
          </div>
        </div>
        <div class="buttonWrap d-flex" v-if="ticket.quantity > 0">
          <button class="minusBtn" @click="removeFromCart()">-</button>
          <span class="dassedIcon">{{ itemQuantity ? itemQuantity : 0 }}</span>
          <button
            class="plusBtn"
            :class="itemQuantity >= 1 || ticket.availableTickets == '' ? 'disabled' : ''"
            :disabled="itemQuantity >= 1 || ticket.availableTickets == ''"
            @click="addToCart()"
          >
            +
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "TicketsWithDiscount",
  components: {},
  props: {
    ticket: Object,
    eventName: String,
    timeSlotId: String,
    discount: Object,
    eventChartKey: String,
  },

  setup(props) {
    const toggleButton = ref(false);
    const discountTicket = ref();
    const store = useStore();
    let cart = computed(function () {
      return store.state.cart.cartItems;
    });

    function addToCart() {
      let data = {
        discount: props.discount,
        ticketId: props.ticket.id,
        timeSlotId: props.timeSlotId,
      };
      store.commit("addDiscountToCart", data);
    }

    function removeFromCart() {
      let data = {
        discount: props.discount,
        ticketId: props.ticket.id,
        timeSlotId: props.timeSlotId,
      };
      store.commit("removeDiscountToCart", data);
    }

    let discountTkt = computed(function () {
      let get_ticket = cart.value.map((element) => {
        get_ticket = element.discounts;
      });
      return get_ticket;
    });

    let itemQuantity = computed(function () {
      let discountID = props.discount;
      let ticket = props.ticket;
      let timeSlotId = props.timeSlotId;
      let itemQty = null;
      let get_ticket = null;
      get_ticket = cart.value.map((element) =>
        element.discounts.filter(
          (item) =>
            item.id === discountID.id &&
            element.id === ticket.id &&
            element.timeSlotId === timeSlotId
        )
      );
      get_ticket.forEach((element) => {
        element.forEach((element) => {
          itemQty = element.quantity;
        });
      });
      return itemQty;
    });

    let perUserQuantity = computed(function () {
      let ticket = props.ticket;
      let perUser = cart.value.filter(
        (item) => item.quantity == ticket.ticketsPerUser && item.id == ticket.id
      );
      return perUser;
    });

    return {
      toggleButton,
      itemQuantity,
      addToCart,
      removeFromCart,
      perUserQuantity,
      discountTicket,
      discountTkt,
    };
  },
};
</script>

<style></style>
