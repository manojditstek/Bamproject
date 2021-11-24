<template>
  <div>
    <div class="d-flex justify-content-between align-items-end header">
      <h2>
        <a href="javascript:void(0)" @click="backButton">{{
          $t("downloadTicket.backtoHome")
        }}</a>
      </h2>
    </div>
    <div class="cardBodyWrapper bgLight">
      <div class="payDesc">
        <h1>{{ $t("downloadTicket.heading1") }}</h1>
        <p>{{ $t("downloadTicket.p1") }}</p>
        <div class="buttons">
          <button class="button btnDefault" @click.prevent="sendMail()">
            {{ $t("downloadTicket.resendEmail") }}
          </button>
          <button class="button btnDefault" @click.prevent="downloadTkt()">
            {{ $t("downloadTicket.downloadTickets") }}
          </button>
        </div>
      </div>
    </div>
    <div class="cardBodyWrapper">
      <div class="ticketDesc">
        <div>
          <h2>{{ cart.cartItems[0].eventName }}</h2>
          <!-- for time slot -->
          <div v-if="tcktDetails.orderItem[0].ticket[0].timeslot">
            <div v-for="ticket in tcktDetails.orderItem" :key="ticket.id">
              <div class="eventDetails">
                <div class="eventInnerDetails">
                  <div class="eventIcon">
                    <i class="fa fa-calendar-o" aria-hidden="true"></i>
                  </div>
                  <div class="eventDesc">
                    <label>{{
                      dateFormat(ticket.ticket[0].timeslot.startAt)
                    }}</label>
                    <label
                      >{{ timeFormat(ticket.ticket[0].timeslot.startAt) }} -
                      {{ timeFormat(ticket.ticket[0].timeslot.endAt) }}</label
                    >
                  </div>
                </div>
                <div class="eventInnerDetails">
                  <div class="eventIcon">
                    <i class="fa fa-map-marker" aria-hidden="true"></i>
                  </div>
                  <div class="eventDesc">
                    <VenuAddress :venue_id="cart.cartItems[0].venueId" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- end time slot -->
          <!-- without time slot -->
          <div class="eventDetails" v-else>
            <div class="eventInnerDetails">
              <div class="eventIcon">
                <i class="fa fa-calendar-o" aria-hidden="true"></i>
              </div>
              <div class="eventDesc">
                <label>{{ dateFormat(cart.cartItems[0].startDate) }}</label>
                <label
                  >{{ timeFormat(cart.cartItems[0].startDate) }} -
                  {{ timeFormat(cart.cartItems[0].endDate) }}</label
                >
              </div>
            </div>
            <div class="eventInnerDetails">
              <div class="eventIcon">
                <i class="fa fa-map-marker" aria-hidden="true"></i>
              </div>
              <div class="eventDesc">
                <VenuAddress :venue_id="cart.cartItems[0].venueId" />
              </div>
            </div>
          </div>
          <!-- end without time slot -->
        </div>
        <div class="ticketCart">
          <table class="table">
            <thead>
              <tr>
                <th>{{ totalQuantity }}</th>
                <th></th>
                <th>{{ tcktDetails.total }} {{ currency }}</th>
              </tr>
            </thead>
            <tbody v-for="ticket in tcktDetails.orderItem" :key="ticket.id">
              <tr>
                <td>{{ ticket.ticket.length }}</td>
                <td>
                  {{ ticket.ticket[0].ticketConfig.name }} <br />
                  <div v-if="ticket.ticket[0].ticketDiscount">
                    <span
                      v-for="disc in ticket.ticket[0].ticketDiscount"
                      :key="disc.id"
                    >
                      {{ disc.name }}</span
                    >
                  </div>
                </td>
                <td>
                  {{ ticket.ticket[0].ticketConfig.faceValue }}
                  {{ ticket.ticket[0].ticketConfig.currency }}
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2">
                  {{ $t("downloadTicket.date") }} {{ toDayDate }}
                </td>
                <td>{{ $t("downloadTicket.orderID") }} {{ tcktDetails.id }}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div class="ticketCartDesc">
          <h4>{{ $t("downloadTicket.hinweis") }}</h4>
          <p>{{ $t("downloadTicket.p2") }}</p>
        </div>
        <div class="footerActionBtn">
          <button type="button" class="button btnBlack" @click="backButton">
            {{ $t("downloadTicket.backtoShop") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { dateFormat, timeFormat } from "../../common/common";
import moment from "moment";
import bam from "../../services/bamSdk";
import VenuAddress from "../../components/singleEvent/venuAddress/VenueAddress.vue";
export default {
  name: "DownloadTicket",
  components: {
    VenuAddress,
  },
  setup() {
    const store = useStore();
    const toDayDate = ref();
    const submitting = ref();
    toDayDate.value = moment().format(" DD MMM YYYY ");
    const tcktDetails = computed(() => {
      return store.state.createdOrder;
    });

    const totalQuantity = computed(() => {
      return store.state.cart.itemsTotalQuantity;
    });

    let cart = computed(function () {
      return store.state.cart;
    });

    let orderID = computed(() => {
      return store.state.createdOrder;
    });

    let currency = computed(function () {
      return store.state.currency;
    });

    function downloadTkt() {
      store.dispatch("downloadTicketPdf", {
        orderId: orderID.value.id,
      });
    }

    async function sendMail() {
      setTimeout(async () => {
      if (!submitting.value) {
        submitting.value = true;
        store.commit("loadingStatus", true);
        try {
          await bam.order.sendOrderEmail({ id: orderID.value.id });
        } catch (error) {
          store.commit("loadingStatus", false);
          store.commit("errorMsg", error);
        } finally {
          submitting.value = false;
        }
      }
      }, 1000)
    }

    function backButton() {
      location.reload();
    }
    return {
      tcktDetails,
      downloadTkt,
      currency,
      toDayDate,
      sendMail,
      cart,
      backButton,
      dateFormat,
      timeFormat,
      totalQuantity,
      submitting,
    };
  },
};
</script>
