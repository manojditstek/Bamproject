<template>
<div class="ticketToggle" :class="toggleButton ? 'show' : ''">
    <div class="cardWrapper" v-if="ticketDscount ? ticketDscount.length == 0 : ''">
        <div class="thumbHeading">
            <h2>
                {{ ticket ? ticket.name : $t("common.ticketNotFound") }} :
                {{ ticket ? ticket.faceValue.toFixed(2) : "0.00" }}
                {{ ticket ? ticket.currency : "EUR" }}
            </h2>
        </div>
        <div class="d-flex">
            <div class="thumbDesc">
                <small>{{ $t("common.inclFees") }} € 0.00</small>
            </div>
            <div class="ticketMessage" v-if="ticket.availableTickets == ''">
                <div class="ticketMessageInner" :class="ticket.availableTickets != '' ? '' : 'soldOut'">
                    {{ ticket.availableTickets != "" ? "" : $t("common.soldOut") }}
                </div>
            </div>
            <div class="buttonWrap d-flex">
                <button class="plusBtn" :class="itemQuantity > 0 ? '' : 'disabled'" @click="removeFromCart()">
                    -
                </button>
                <span class="dassedIcon">{{ itemQuantity ? itemQuantity : 0 }}</span>
                <button class="plusBtn" :class="
              ticket.availableTickets == '' || perUserQuantity || saleStart(ticket.startSaleAt,ticket.endSaleAt)  ? 'disabled' : ''" :disabled="ticket.availableTickets == '' ||perUserQuantity || saleStart(ticket.startSaleAt,ticket.endSaleAt)" @click="addToCart()">
                    +
                </button>
            </div>
        </div>
    </div>

    <div v-else>
        <div class="cardWrapper" @click="toggleButton = !toggleButton">
            <div class="thumbHeading">
                <h2>
                    {{ ticket ? ticket.name : $t("common.ticketNotFound") }} : {{ ticket.minPrice }} - {{
              ticket ? ticket.faceValue.toFixed(2) : "0.00"
            }}
                    {{ ticket ? ticket.currency : "EUR" }}
                </h2>
            </div>
            <div class="d-flex">
                <div class="thumbDesc" >
                    <small>{{ $t("common.inclFees") }} € 0.00</small>
                </div>
                <div class="ticketMessage" v-if="ticket.availableTickets == ''">
                    <div class="ticketMessageInner" :class="ticket.availableTickets != '' ? '' : 'soldOut'">
                        {{ ticket.availableTickets != "" ? "" : $t("common.soldOut") }}
                    </div>
                </div>
                <div class="collapseArrow lightBg" :class="toggleButton ? 'active' : ''" >
                    <i class="fa fa-angle-right"></i>
                </div>
            </div>
        </div>
        <div v-if="ticketDscount ? ticketDscount.length > 0 : ''" v-show="toggleButton" class="toggleList">
            <div v-if="ticketDscount ? ticketDscount.length > 0 : ''">
                <StandardTicket :ticket="ticket" />
                <TicketsWithDiscount :ticket="ticket" :ticketsPerUser="ticket.ticketsPerUser"  :discount="discount" v-for="discount in ticket.ticketDiscount" :key="discount.id" />
            </div>
        </div>
    </div>
</div>
</template>
<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import TicketsWithDiscount from "../ticketList/TicketsWithDiscount";
import StandardTicket from "../ticketList/StandardTickets.vue";
import { saleStart } from '@/common/common'
export default {
  name: "Tickets",
  components: {
    TicketsWithDiscount,
    StandardTicket,
  },
  props: {
    ticket: Object,
    eventName: String,
    timeSlotId: Number,
    ticketDscount: Object,
    eventChartKey: String,
    venueId: String,
    startDate: Date,
    endDate: Date,
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
          ...props.ticket,
        },
        eventName: props.eventName,
        timeslot_id: props.timeSlotId,
        venueId: props.venueId,
        startDate: props.startDate,
        endDate: props.endDate,
      };
      store.commit("addCartItem", ticket);
    }

    function removeFromCart() {
      let ticket = {
        ...props.ticket,
        timeSlotId: props.timeSlotId,
      };
      store.commit("removeCartItem", ticket);
    }

    let itemQuantity = computed(() => {
      let ticket = props.ticket;
      let timeSlotId = props.timeSlotId;
      if (timeSlotId) {
        let get_ticket = cart.value.filter(
          (item) => item.id == ticket.id && item.timeSlotId == timeSlotId
        );
        return get_ticket[0]?.quantity;
      } else {
        let get_ticket = cart.value.filter((item) => item.id == ticket.id);
        return get_ticket[0]?.quantity;
      }
    });

    let perUserQuantity = computed(() => {
      let ticket = props.ticket;
      let perUser = cart.value.filter(
        (item) => item.quantity == ticket.ticketsPerUser && item.id == ticket.id
      );
      return perUser[0]?.ticketsPerUser;
    });

    let minPrice = 0;
    if (props.ticketDscount) {
      props.ticketDscount.forEach((item) => {
        let temp = [];
        temp.push(item.value);
        minPrice = temp.reduce(function (prev, curnt) {
          return prev < curnt ? prev : curnt;
        });
      });
    }

    return {
      toggleButton,
      itemQuantity,
      addToCart,
      removeFromCart,
      perUserQuantity,
      discountTicket,
      minPrice,
      saleStart
    };
  },
};
</script>

<style></style>
