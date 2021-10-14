export default {
    event:{},
    events:[],
    venueAddress:'',
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
    timerOut:2*60000,
    timerDispaly:null,
    createdOrder:[],
    singleEventWithTimeSlot:null,
    timeSlot:null

}