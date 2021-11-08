<template>
  <div>
    <!-- step 1 -->
    <div class="d-flex justify-content-between align-items-end header">
      <h2>
        <!-- <router-link to="/">{{$t('downloadTicket.backtoHome')}}</router-link> -->
        <div  @click="backButton">{{$t('downloadTicket.backtoHome')}}</div>
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
        <div  >
        <h2 >{{cart.cartItems[0].eventName}} </h2>

        <!-- for time slot -->
        <div v-if="tcktDetails.orderItem[0].ticket[0].timeslot">
        <div v-for="ticket in tcktDetails.orderItem" :key="ticket.id">
        <div class="eventDetails" >
          <div class="eventInnerDetails">
            <div class="eventIcon">
              <i class="fa fa-calendar-o" aria-hidden="true"></i>
            </div>
            <div class="eventDesc">
              <label>{{dateFormat(ticket.ticket[0].timeslot.startAt)}}</label>
              <label>{{timeFormat(ticket.ticket[0].timeslot.startAt)}} - {{timeFormat(ticket.ticket[0].timeslot.endAt)}}</label>
            </div>
          </div>
          <div class="eventInnerDetails">
            <div class="eventIcon">
              <i class="fa fa-map-marker" aria-hidden="true"></i>
            </div>
            <div class="eventDesc">
              <!-- <label>venue</label>
              <label>city</label> -->
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
              <label>{{dateFormat(cart.cartItems[0].startDate)}}</label>
              <label>{{timeFormat(cart.cartItems[0].startDate)}} - {{timeFormat(cart.cartItems[0].endDate)}}</label>
            </div>
          </div>
          <div class="eventInnerDetails">
            <div class="eventIcon">
              <i class="fa fa-map-marker" aria-hidden="true"></i>
            </div>
            <div class="eventDesc">
              <!-- <label>venue</label>
              <label>city</label> -->
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
              <th>{{tcktDetails.orderItem.length}}</th>
              <th></th>
              <th>{{tcktDetails.total}} {{currency}}</th>
            </tr>
          </thead>
          <tbody v-for="ticket in tcktDetails.orderItem" :key="ticket.id">
            <tr >
              <td>{{ticket.ticket.length}}</td>
              <td >{{ticket.ticket[0].ticketConfig.name}} <br>

                <div v-if="ticket.ticket[0].ticketDiscount">
                  <span v-for="disc in ticket.ticket[0].ticketDiscount" :key="disc.id"> {{disc.name}}</span>
                </div>
                
              </td>
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
        <div class="footerActionBtn"><button type="button" class="button"  @click="backButton">{{$t('downloadTicket.backtoShop')}} </button></div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed,ref } from "vue";
import { useStore } from "vuex";
import moment from 'moment'
import bam from '../../services/bamSdk'
import VenuAddress from '../../components/singleEvent/venuAddress/VenueAddress.vue'
import {useRouter} from "vue-router";
export default {
  name: "DownloadTicket",
  components:{
    VenuAddress
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const toDayDate = ref();
    toDayDate.value = moment().format(" DD MMM YYYY ")
    const tcktDetails = computed(() => {
      return store.state.createdOrder;
    });

    let cart = computed(function () {
            return store.state.cart
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

    function backButton(){    
           location.reload();
        }

    function dateFormat(value){
       return moment(value)
                .format("DD MMM YYYY")
    }

    function timeFormat(value) {
            return moment(value).format(" HH:mm a");
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
      timeFormat
    };
  }
};
</script>
