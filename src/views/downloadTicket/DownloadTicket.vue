<template>
  <div>
    <!-- step 1 -->
    <div class="d-flex justify-content-between align-items-end header">
      <h2>
        <router-link to="/">{{$t('downloadTicket.backtoHome')}}</router-link>
      </h2>
    </div>
    <!---->
    <div class="cardBodyWrapper bgLight">
      <div class="payDesc">
        <h1>{{$t('downloadTicket.heading1')}}</h1>
        <p>{{$t('downloadTicket.p1')}}</p>
        <div class="buttons">
          <button class="button btnGreen" @click="sendMail()">{{$t('downloadTicket.resendEmail')}}</button>
          <button class="button btnDefault" @click="downloadTkt()">{{$t('downloadTicket.downloadTickets')}}</button>
        </div>
      </div>
    </div>
    <!---->
    <div class="cardBodyWrapper">
      <div class="ticketDesc">
        <h2>{{$t('downloadTicket.eventName')}}</h2>
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
              <label>{{$t('downloadTicket.venueName')}}</label>
              <label>08:30 pm - 11:30pm</label>
            </div>
          </div>
        </div>
        <div class="ticketCart">
         <table class="table">
          <thead>
            <tr>
              <th>{{tcktDetails.orderItem.length}}</th>
              <th></th>
              <th>{{tcktDetails.total}} {{currency}}</th>
            </tr>
          </thead>
          <tbody v-for="(ticket) in tcktDetails.orderItem" :key="ticket.id">
            <tr >
              <td>{{ticket.ticket.length}}</td>
              <td >{{ticket.ticket[0].ticketConfig.name}} <br> {{$t('downloadTicket.discountCategory')}}</td>
              <td>{{ticket.ticket[0].ticketConfig.faceValue}} {{ticket.ticket[0].ticketConfig.currency}}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2">{{$t('downloadTicket.date')}} {{toDayDate}}</td>
              <td>{{$t('downloadTicket.orderID')}} {{tcktDetails.id}}</td>
            </tr>
          </tfoot>
         </table>

        </div>
        <div class="ticketCartDesc">
          <h4>{{$t('downloadTicket.hinweis')}} </h4> 
          <p>{{$t('downloadTicket.p2')}} </p>
        </div>
        <div class="footerActionBtn"><router-link to="/" class="button"><button type="button">{{$t('downloadTicket.backtoShop')}} </button></router-link></div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed,ref } from "vue";
import { useStore } from "vuex";
import moment from 'moment'
import bam from '../../services/bamSdk'
export default {
  name: "DownloadTicket",
  components:{

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
    async function sendMail(){
      await bam.order.sendOrderEmail({ id: orderID.value.id })
    }
    return {
      tcktDetails,
      downloadTkt,
      currency,
      toDayDate,
      sendMail
    };
  }
};
</script>
