<template>
  <div>
    <!-- step 1 -->
    <div class="d-flex justify-content-between align-items-end header">
      <h2>
        <router-link to="/">Label</router-link>
      </h2>
    </div>
    <!---->
    <div class="cardBodyWrapper">
      <div class="ticketInfo">
        <h1>Ticket Holder Information</h1>
        <p>Donec id elit non mi porta gravida at eget metus. Morbi leo risus, porta consectetur vestibulum.</p>
      </div>
    </div>
    <!---->
     <div class="cardBodyWrapper bgLight brdrtop">
      <div class="ticketCategory">
        <h2>Ticket Category <span>Discount Category</span></h2>
        <div class="amount">240,00 EUR</div>
      </div>
    </div>
    <!---->
    <div class="cardBodyWrapper">
      <div class="formInputs">
        <div class="formGroup">
          <input type="text" class="form-control" />
          <div class="labelInput">First Name</div>
          <div class="error"></div>
        </div>
                <div class="formGroup">
          <input type="text" class="form-control" />
          <div class="labelInput">Last Name</div>
          <div class="error"></div>
        </div>
                <div class="formGroup">
          <input type="text" class="form-control" />
          <div class="labelInput">Phone</div>
          <div class="error"></div>
        </div>
                <div class="formGroup">
          <input type="text" class="form-control" />
          <div class="labelInput">Email</div>
          <div class="error"></div>
        </div>
      </div>
      <div class="footerActionBtn btns">
          <button class="button">Label</button>
        </div>
    </div>
    <!---->
  </div>
</template>
<script>
export default {
  setup() {}
};
</script>
