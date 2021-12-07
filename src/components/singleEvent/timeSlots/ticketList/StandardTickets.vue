<template>
  <div class="cardWrapper d-flex">
    <div class="detailsCol pad-0">
      <h2>{{ ticket.name }}: {{ticket.faceValue}} {{ "EUR" }}</h2>
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
          <button class="plusBtn" :class="itemQuantity>0?'':'disabled'" @click="removeFromCart">-</button>
          <span class="dassedIcon">{{ itemQuantity ? itemQuantity : 0 }}</span>
          <button
            class="plusBtn"
            :class="ticket.availableTickets == '' ? 'disabled' : ''"
            :disabled=" ticket.availableTickets == '' || perUserQuantity "
            @click="addToCart"
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
  name: "SatandaredTicket",
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
      // let discountTicket = props.ticket
      // delete discountTicket['ticketDiscount']
      // console.log('discountTicket',discountTicket)
      let ticket = {  
        item: props.ticket ,
        ticketId: props.ticket.id,
        timeSlotId: props.timeSlotId,
      };
      store.commit("addCartItem", ticket);
    }

    function removeFromCart() {
      let ticket = {
        ...props.ticket,
        ticketId: props.ticket.id,
        timeSlotId: props.timeSlotId,
      };
      store.commit("removeCartItem", ticket);
    }

    let discountTkt = computed(function () {
      let get_ticket = cart.value.map((element) => {
        get_ticket = element.discounts;
      });
      return get_ticket;
    });

    let itemQuantity = computed(()=> {
      let ticket = props.ticket;
      let timeSlotId = props.timeSlotId;
      let get_ticket = null;
      get_ticket = cart.value.filter(
          (item) =>
            item.id === ticket.id &&
            item.timeSlotId === timeSlotId
            
          )
      return get_ticket[0]?.quantity;
    })

   let perUserQuantity = computed(() => {
            let ticket = props.ticket;
            let perUser = cart.value.filter(
                (item) => item.quantity == ticket.ticketsPerUser && item.id == ticket.id
            );
            return perUser[0] ?.ticketsPerUser;
        });

let disabled = computed(()=>{
  return store.state.disabled;
})

    

    return {
      toggleButton,
      itemQuantity,
      addToCart,
      removeFromCart,
      perUserQuantity,
      discountTicket,
      discountTkt,
      disabled
    };
  },
};
</script>

<style></style>
