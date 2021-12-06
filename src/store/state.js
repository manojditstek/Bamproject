/* Store variable initalization */
export default {
    event:{},
    events:[],
    venueAddress:null,
    product:[],
    currency:'EUR',
    eventName:'',
    cart:{
        cartItems:[],
        itemsTotalQuantity:0,
        itemTotalAmount:0
    },
    recurringEvent:null,
    loadingStatus:false,
    countDownTimer : 20,
    timerOut:10*60000,
    timerDispaly:null,
    createdOrder:null,
    singleEventWithTimeSlot:null,
    timeSlot:null,
    paymentInitiateIds:{},
    downloadTicket:null,
    downloadTicketPdf:null,
    errorMsg:null,
    workSpaceKey:null,
    ticketFormat:null,
    kycLevelId:null,
    submitting:false,
    disabled:false
  

}