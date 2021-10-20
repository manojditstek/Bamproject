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
          <button class="button btnDefault" @click="downloadTkt()">Download tickets</button>
        </div>
      </div>
    </div>
    <!---->
    <div class="cardBodyWrapper">
        <Loader />
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
              <th>{{tcktDetails.order_item.length}}</th>
              <th></th>
              <th>{{tcktDetails.total}} {{currency}}</th>
            </tr>
          </thead>
          <tbody v-for="(ticket,i) in tcktDetails.order_item" :key="ticket.id">

            <tr v-for="tkt in ticket.ticket" :key="tkt.id">
              <td>{{++i}}</td>
              <td >{{tkt.ticket_config.name}} <br> Discount Category</td>
              <td>{{tkt.ticket_config.face_value}} {{tkt.ticket_config.currency}}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2">Date: {{toDayDate}}</td>
              <td>Order ID: {{tcktDetails.id}}</td>
            </tr>
          </tfoot>
         </table>

        </div>
        <div class="ticketCartDesc">
          <h4>Hinweis </h4> 
          <p>Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Nullam quis risus eget urna mollis ornare vel eu leo.</p>
        </div>
        <div class="footerActionBtn"><router-link to="/" class="button"><button type="button"> Back to Shop </button></router-link></div>
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
import { computed,ref } from "vue";
import { useStore } from "vuex";
import moment from 'moment'
import Loader from '../../components/loader/Loader.vue'
export default {
  name: "DownloadTicket",
  components:{
      Loader
  },
  setup() {
    const store = useStore();
    const toDayDate = ref();
    toDayDate.value = moment().format(" DD MMM YYYY ")
    const tcktDetails = computed(() => {
      return store.state.createdOrder;
    });

    let orderID = computed(() => {
      return store.state.createdOrder;
    });

    let currency = computed(function () {
            return store.state.currency
        });

    async function downloadTkt() {
      await store.dispatch("downloadTicketPdf", {
        orderId: orderID.value.id
      });
    }
    return {
      tcktDetails,
      downloadTkt,
      currency,
      toDayDate
    };
  }
};
</script>
