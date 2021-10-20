<template>
  <div class="d-flex justify-content-between align-items-end header">
    
      <h2> <i class="fa fa-angle-left" aria-hidden="true"></i>
          Events</h2>
      <div class="datePicker"></div>
    </div>
    <div class="innerWraper">
      <div class="cardWrapper d-flex">
        <div class="dateCol">
          <h4>Mon</h4>
          <h2>10</h2>
          <h4>June 21</h4>
        </div>
        <div class="detailsCol">
          <p>08:30 pm - 11:30 pm</p>
          <h2>Event Name (one line only)</h2>
          <p>Venue Name</p>
          <p>City Tellus Mollis Lorem</p>
        </div>
      </div>
    </div>
    <div class="cardBodyWrapper">
      <div class="ticketToggle">
        <div
          class="cardWrapper d-flex"
          :class="toggleButton?'active':''"
          @click="toggleButton=!toggleButton"
        >
          <div class="detailsCol">
            <h2>Ticket Category: 40,00 - 60,00 EUR</h2>
            <p>incl. fees</p>
          </div>
          <div class="collapseArrow lightBg">
            <img src="img/black-arrow.svg" width="15" alt="image" />
          </div>
        </div>
        <div v-show="toggleButton" class="toggleList">
          <div class="cardWrapper d-flex">
            <div class="detailsCol">
              <h2>Discount Category: 40,00 - 60,00 EUR</h2>
              <div class="priceWrap d-flex">
                <div class="eventPrice1">
                  <p>Fees: € 2,50</p>
                  <p>Total: € 87,50</p>
                </div>
                <div class="buttonWrap d-flex">
                  <button class="minusBtn">-</button>
                  <span class="dassedIcon">0</span>
                  <button class="plusBtn">+</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="ticketToggle">
        <div
          class="cardWrapper d-flex"
          :class="toggleButton?'active':''"
          @click="toggleButton=!toggleButton"
        >
          <div class="detailsCol">
            <h2>Ticket Category: 40,00 - 60,00 EUR</h2>
            <p>incl. fees</p>
          </div>
          <div class="collapseArrow lightBg">
            <img src="img/black-arrow.svg" width="15" alt="image" />
          </div>
        </div>
        <div v-show="toggleButton" class="toggleList">
          <div class="cardWrapper d-flex">
            <div class="detailsCol">
              <h2>Discount Category: 40,00 - 60,00 EUR</h2>
              <div class="priceWrap d-flex">
                <div class="eventPrice1">
                  <p>Fees: € 2,50</p>
                  <p>Total: € 87,50</p>
                </div>
                <div class="buttonWrap d-flex">
                  <button class="minusBtn">-</button>
                  <span class="dassedIcon">0</span>
                  <button class="plusBtn">+</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="ticketToggle">
        <div
          class="cardWrapper d-flex"
          :class="toggleButton?'active':''"
          @click="toggleButton=!toggleButton"
        >
          <div class="detailsCol">
            <h2>Ticket Category: 40,00 - 60,00 EUR</h2>
            <p>incl. fees</p>
          </div>
          <div class="collapseArrow lightBg">
            <img src="img/black-arrow.svg" width="15" alt="image" />
          </div>
        </div>
        <div v-show="toggleButton" class="toggleList">
          <div class="cardWrapper d-flex">
            <div class="detailsCol">
              <h2>Discount Category: 40,00 - 60,00 EUR</h2>
              <div class="priceWrap d-flex">
                <div class="eventPrice1">
                  <p>Fees: € 2,50</p>
                  <p>Total: € 87,50</p>
                </div>
                <div class="buttonWrap d-flex">
                  <button class="minusBtn">-</button>
                  <span class="dassedIcon">0</span>
                  <button class="plusBtn">+</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="ticketToggle">
        <div
          class="cardWrapper d-flex"
          :class="toggleButton?'active':''"
          @click="toggleButton=!toggleButton"
        >
          <div class="detailsCol">
            <h2>Ticket Category: 40,00 - 60,00 EUR</h2>
            <p>incl. fees</p>
          </div>
          <div class="collapseArrow lightBg">
            <img src="img/black-arrow.svg" width="15" alt="image" />
          </div>
        </div>
        <div v-show="toggleButton" class="toggleList">
          <div class="cardWrapper d-flex">
            <div class="detailsCol">
              <h2>Discount Category: 40,00 - 60,00 EUR</h2>
              <div class="priceWrap d-flex">
                <div class="eventPrice1">
                  <p>Fees: € 2,50</p>
                  <p>Total: € 87,50</p>
                </div>
                <div class="buttonWrap d-flex">
                  <button class="minusBtn">-</button>
                  <span class="dassedIcon">0</span>
                  <button class="plusBtn">+</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="singleTicketTotalAmount d-flex">
      <div class="ticketCol">
        <h3>Tickets</h3>
        <h2>0</h2>
      </div>
      <div class="ticketCol">
        <h3>Total Amount</h3>
        <h2>0</h2>
      </div>
      <div class="labelBtn">
        <a href="#/shop" class="button">Cart</a>
      </div>
    </div>
</template>

<script>
import{ref} from 'vue'
export default {
    setup(){

        const toggleButton = ref(false)

        return{
            toggleButton

        }
    }

}
</script>

<style>

</style>