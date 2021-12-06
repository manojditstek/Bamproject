<template>
<div class="cardWrapper d-flex">
    <div class="detailsCol pad-0">
        <h2>{{ discount.name }}: {{discount.faceValue}} {{ "EUR" }}</h2>
        <div class="priceWrap d-flex">
            <div class="eventPrice1">
                <small>{{ $t("common.fees") }} € 0.00</small>
                <small>{{ $t("common.total") }} € 0.00</small>

            </div>
            <div class="ticketMessage" v-if="ticket.availableTickets == ''">
                <div class="ticketMessageInner" :class="discount.availableTickets != '' ? '' : 'soldOut'">
                    {{ discount.availableTickets != "" ? "" : $t("common.soldOut") }}
                </div>
            </div>
            <div class="buttonWrap d-flex" v-if="ticket.quantity > 0">
                <button class="plusBtn" :class="itemQuantity>0?'':'disabled'" @click="removeFromCart()">-</button>
                <span class="dassedIcon">{{ itemQuantity ? itemQuantity : 0 }}</span>
                <button class="plusBtn" :class="ticket.availableTickets == '' ? 'disabled' : ''" :disabled=" ticket.availableTickets == '' " @click="addToCart()">
                    +
                </button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    ref,
    computed,
    watch
} from "vue";
import {
    useStore
} from "vuex";
export default {
    name: "TicketsWithDiscount",
    components: {},
    props: {
        ticket: Object,
        eventName: String,
        timeSlotId: String,
        discount: Object,
        eventChartKey: String,
        ticketsPerUser: Number
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
            // console.log('=>',discountID)
            let timeSlotId = props.timeSlotId;
            // console.log('=>=>',timeSlotId)
            let get_ticket = null;
            get_ticket = cart.value.filter(
                (item) =>
                item.id === discountID &&
                item.ticketId === ticketId &&
                item.timeSlotId === timeSlotId

            )
            return get_ticket[0] ?.quantity;
        })

        let perUserQuantity = computed(() => {
            let ticketsPerUser = props.ticketsPerUser;
            let ticketId = props.discount.id;
            let perUser = cart.value.filter(
                (item) => item.overAllQuantity == ticketsPerUser && item.id == ticketId
            );
            return perUser[0] ?.ticketsPerUser;
        });

        let disabled = computed(() => {
            return store.state.disabled;
        })

        return {
            toggleButton,
            itemQuantity,
            addToCart,
            removeFromCart,
            perUserQuantity,
            discountTicket,
            disabled
            // test
            // discountedPrice
        };
    },
};
</script>

<style></style>
