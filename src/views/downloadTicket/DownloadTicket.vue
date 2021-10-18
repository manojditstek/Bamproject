<template>
  <div>
    <!-- step 1 -->
    <div class="d-flex justify-content-between align-items-end header">
      <h2>
        <router-link to="#">Label</router-link>
      </h2>
    </div>
    <!---->
    <div class="cardBodyWrapper bgLight">
      <div class="payDesc">
        <h1>Your tickets are in your Inbox</h1>
        <p>We sent you a confirmation mail together with your tickets. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.</p>
        <div class="buttons">
          <button class="button btnGreen">Resend Email</button>
          <button class="button btnDefault">Download tickets</button>
        </div>
      </div>
    </div>
    <!---->
    <div class="cardBodyWrapper">
      <div class="ticketDesc">
        <h2>Event Name</h2>
        <div class="eventDetails">
          <div class="eventInnerDetails">
            <div class="eventIcon">
              <i class="fa fa-calendar-o" aria-hidden="true"></i>
            </div>
            <div class="eventDesc">
              <label>23 June 2021</label>
              <label>08:30 pm - 11:30pm</label>
            </div>
          </div>
          <div class="eventInnerDetails">
            <div class="eventIcon">
              <i class="fa fa-map-marker" aria-hidden="true"></i>
            </div>
            <div class="eventDesc">
              <label>Venue Name</label>
              <label>08:30 pm - 11:30pm</label>
            </div>
          </div>
        </div>
        <div class="ticketCart">
         <table class="table">
          <thead>
            <tr>
              <th>30</th>
              <th></th>
              <th>720,00 EUR</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>10</td>
              <td>Ticket Category <br> Discount Category</td>
              <td>240,00 EUR</td>
            </tr>
             <tr>
              <td>10</td>
              <td>Ticket Category <br> Discount Category</td>
              <td>240,00 EUR</td>
            </tr>
             <tr>
              <td>10</td>
              <td>Ticket Category <br> Discount Category</td>
              <td>240,00 EUR</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2">Date: 25 June 2021</td>
              <td>Order ID: BAM1234567890</td>
            </tr>
          </tfoot>
         </table>

        </div>
        <div class="ticketCartDesc">
          <h4>Hinweis </h4> 
          <p>Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Nullam quis risus eget urna mollis ornare vel eu leo.</p>
        </div>
        <div class="footerActionBtn"><a href="#" class="button"> Back to Shop </a></div>
      </div>
    </div>

    <!---->
    <!-- <div v-for="ticket in tcktDetails.data.data.order_item" :key="ticket.id">
        <div v-for="tkt in ticket.ticket" :key="tkt.id">
            <div>Tickets:{{tkt.ticket_config.name}} - {{tkt.ticket_config.face_value}} {{tkt.ticket_config.currency}}</div>
        </div>
    </div>
    <div>Total Price : {{tcktDetails.data.data.total}}</div>
    <button @click="downloadTkt()">Download Ticket</button>-->
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "DownloadTicket",
  setup() {
    const store = useStore();

    const tcktDetails = computed(() => {
      return store.state.downloadTicket;
    });

    let orderID = computed(() => {
      return store.state.createdOrder;
    });

    async function downloadTkt() {
      await store.dispatch("downloadTicketPdf", {
        orderId: orderID.value.id
      });
    }
    return {
      tcktDetails,
      downloadTkt
    };
  }
};
</script>
