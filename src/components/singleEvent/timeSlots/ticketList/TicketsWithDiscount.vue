<template>
<div class="cardWrapper d-flex">
    <div class="detailsCol pad-0">
        <h2>{{ discount.name }}: {{discount.faceValue}} {{ "EUR" }}</h2>
        <div class="priceWrap d-flex">
            <div class="eventPrice1">
                <small>{{ $t("common.fees") }} € 0.00</small>
                <small>{{ $t("common.total") }} € 0.00</small>
            </div>
            <div class="ticketMessage" v-if="discount.availableTickets == ''">
                <div class="ticketMessageInner" :class="discount.availableTickets != '' ? '' : 'soldOut'">
                    {{ discount.availableTickets != "" ? "" : $t("common.soldOut") }}
                </div>
            </div>
             <div class="ticketMessage" v-if="saleStart(ticket.startSaleAt,ticket.endSaleAt) == false">
                 <div class="ticketMessageInner" :class="saleStart(ticket.startSaleAt,ticket.endSaleAt) == false ? 'soldOut':''">
                    {{ saleStart(ticket.startSaleAt,ticket.endSaleAt) == false? $t("common.notStart"):'' }}
                </div>
            </div>
            <div class="buttonWrap d-flex">
                <button class="plusBtn" :class="itemQuantity>0?'':'disabled'" @click="removeFromCart()">-</button>
                <span class="dassedIcon">{{ itemQuantity ? itemQuantity : 0 }}</span>
                <button class="plusBtn" :class="discount.availableTickets == '' || perUserQuantity || saleStart(discount.startAt,discount.endAt)  ? 'disabled' : ''" :disabled=" discount.availableTickets == ''||perUserQuantity || saleStart(discount.startAt,discount.endAt) " @click="addToCart()">
                    +
                </button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { ref, computed} from "vue";
import { useStore } from "vuex";
import { saleStart } from '@/common/common'
export default {
  name: "TicketsWithDiscount",
  components: {},
  props: {
    ticket: Object,
    eventName: String,
    timeSlotId: String,
    discount: Object,
    eventChartKey: String,
    ticketsPerUser: Number,
  },

  setup(props) {
    const toggleButton = ref(false);
    const discountTicket = ref();
    const store = useStore();
    let cart = computed(() => {
      return store.state.cart.cartItems;
    });

    function addToCart() {
      let ticket = {
        item: {
          ...props.discount,
          ticketsPerUser: props.ticketsPerUser,
          currency: props.ticket.currency,
        },
        ticketId: props.ticket.id,
        timeSlotId: props.timeSlotId,
      };

      store.commit("addCartItem", ticket);
    }

    function removeFromCart() {
      let ticket = {
        ...props.discount,
        ticketsPerUser: props.ticketsPerUser,
        ticketId: props.ticket.id,
        timeSlotId: props.timeSlotId,
      };
      store.commit("removeCartItem", ticket);
    }

    let itemQuantity = computed(() => {
      let discountID = props.discount.id;
      let ticketId = props.ticket.id;
      let timeSlotId = props.timeSlotId;
      let get_ticket = null;
      get_ticket = cart.value.filter(
        (item) =>
          item.id === discountID &&
          item.ticketId === ticketId &&
          item.timeSlotId === timeSlotId
      );
      return get_ticket[0]?.quantity;
    });

    let perUserQuantity = computed(() => {
      let ticketsPerUser = props.ticketsPerUser;
      let ticketId = props.discount.id;
      let perUser = cart.value.filter(
        (item) => item.overAllQuantity == ticketsPerUser && item.id == ticketId
      );
      return perUser[0]?.ticketsPerUser;
    });

    let disabled = computed(() => {
      return store.state.disabled;
    });

    return {
      toggleButton,
      itemQuantity,
      addToCart,
      removeFromCart,
      perUserQuantity,
      discountTicket,
      disabled,
      saleStart
    };
  },
};
</script>

<style></style>
