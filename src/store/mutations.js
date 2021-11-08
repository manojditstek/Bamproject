// This block of code set the single event 
export const setEvent = (state, event) => {
  state.event = event;
}

// This block of code set the mutltiple event
export const setEvents = (state, events) => {
  state.events = events;
}

export const setVenue = (state, venue)=>{
  state.venueAddress = venue;
}

export const loadingStatus = (state, newLoadingState)=>{
  state.loadingStatus = newLoadingState
}

export const setRecurringEvent = (state, event)=>{
  state.recurringEvent = event;
}

export const setEventWithTimeSlot = (state, eventWithTimeSlot)=>{
  state.singleEventWithTimeSlot = eventWithTimeSlot;
}

export const setTimeSlots = (state,timeSlot)=>{
  state.timeSlot = timeSlot;
}



/* cart module  */

// This block of code check the items in cart
const isItemInCart = (cartItems, item) => {
  let index = cartItems.findIndex(x => x.id === item.id && x.timeSlotId === item.timeSlotId)
  if (index > -1) {
    return true
  }
  return false
}


// This block of code add item in cart
export const addCartItem = (state, data) => {
  // console.log('items in cart',data)
  data.item.discounts = []; //for discount
  data.item.totalDiscount = 0; //for discount
  data.item.timeSlotId = data.timeslot_id;
  data.item.quantity = getItemQtyCart(state.cart.cartItems, data.item) + 1;
  data.item.overAllQuantity = getOverAllQtyCart(state.cart.cartItems, data.item) + 1;
  if(data.item.overAllQuantity > data.item.ticketsPerUser){
    alert("Limit fot this ticket exceeds")
    return
  }
  data.item.totalPrice = getItemTotalPrice(data.item);
  data.item.eventName = data.eventName;
  data.item.venueId = data.venueId;
  data.item.startDate = data.startDate,
  data.item.endDate = data.endDate
  if (isItemInCart(state.cart.cartItems, data.item)) {
    updateCartItem(state, data.item)
  } else {
    data.item.discounts = []; //for discount
    data.item.totalDiscount = 0; //for discount
    state.cart.cartItems.push(data.item);
    totalPrice(state,0);
    totalQuantity(state);
  }

}


// This block of code update item in cart
export const updateCartItem = (state, updatedItem) => {
  state.cart.cartItems = state.cart.cartItems.map((cartItem) => {
    if (cartItem.id === updatedItem.id && cartItem.timeSlotId === updatedItem.timeSlotId) {
      return updatedItem;
    }
    return cartItem;
  })
  totalPrice(state,0);
  totalQuantity(state);
}

// This block of code remove item in cart
export const removeCartItem = (state, item) => {
  if (isItemInCart(state.cart.cartItems, item)) {
    let quantity = getItemQtyCart(state.cart.cartItems, item) - 1;
    if (quantity === 0) {
      let cartItems = []
      state.cart.cartItems.forEach((cartItem) => {
        if(cartItem.id === item.id && item.timeSlotId === cartItem.timeSlotId){
          // 
        }else{
          cartItems.push(cartItem)
        }
      })
      state.cart.cartItems = cartItems
      totalPrice(state,0);
      totalQuantity(state); 
    } else {
      item.quantity = quantity
      item.discounts = []; // for discount
      item.totalDiscount = 0; // for discount
      updateCartItem(state, item);
      item.totalPrice = getItemTotalPrice(item);
    }
  }
}

// This block of code remove items(total item for single category) in cart
export const removeCartItemComplete = (state, item) => {
  if (isItemInCart(state.cart.cartItems, item)) {
    state.cart.cartItems = state.cart.cartItems.filter(x => x.id !== item.id)
    totalPrice(state);
    totalQuantity(state);
  }
}

// cart back button 
export const backToHome = (state) =>{
  state.cart.cartItems = [],
  state.cart.itemsTotalQuantity=0,
  state.cart.itemTotalAmount=0
}


// This block of code used for get single item  
const getItemQtyCart = (cartItems, item) => {
  let qty = cartItems.filter(x => x.id === item.id && x.timeSlotId === item.timeSlotId)[0]?.quantity || 0
  return qty
}

// checking per user limit for ticket booking
const getOverAllQtyCart = (cartItems, item) => {
 let qty =  cartItems.filter(x => x.id === item.id).reduce((total, next)=>{
    return total + next.quantity
  },0);
  return qty
}

// This block of code used for get single item price 
const getItemTotalPrice = (item) => {
  return (item.quantity * item.faceValue);

}

// This block of code calculate total price 
export const totalPrice = (state,discount) => {
  state.cart.itemTotalAmount = state.cart.cartItems.reduce((total, next) => {
    return total + (next.quantity * next.faceValue)-discount
  }, 0)
}



// This block of code calculate total quantity
export const totalQuantity = (state) => {
  state.cart.itemsTotalQuantity = state.cart.cartItems.reduce((total, next) => {
    return total + (next.quantity)
  }, 0)
}



//discount module

//add discount in cart
export const addDiscountToCart = (state, data) => {
  state.cart.cartItems.forEach(element => {
    data.quantity = getItemQtyDiscount(element.discounts, data) + 1;
    // data.overAllQuantity = getOverAllQtyCart(element.discounts, data) + 1;
    if (isItemInCart(element.discounts, data)) {
      updateCartDiscountItem(element.discounts, data)
    } else {
    element.discounts.push(data);
    element.totalDiscount=data.value;
    totalPrice(state,data.value);
    }
  });  
}



const getItemQtyDiscount = (cartItems, item) => {
  let qty = cartItems.filter(x => x.id === item.id )[0]?.quantity || 0
  return qty
}


export const updateCartDiscountItem = (item, updatedItem) => {
  item = item.map((cartItem) => {
    if (cartItem.id === updatedItem.id) {
      return updatedItem;
    }
    
    return cartItem;
    
  })
}


export const removeDiscountToCart = (state, data) => {
  state.cart.cartItems.forEach(element => {
  if (isItemInCart(element.discounts, data)) {
    let quantity = getItemQtyDiscount(element.discounts, data) - 1;
    if (quantity === 0) {
      element.discounts= element.discounts.filter(x => x.id !== data.id)
      element.totalDiscount=0;
      totalPrice(state,0);
    } else {
      data.quantity = quantity
      updateCartDiscountItem(element.discounts, data);
    }
  }
})
}
// end discount module

/*end cart module */


/* start timer*/
export const timer = (state) => {
  let flag=0
  setInterval(() => {
    if(state.timerOut>0){
      let setTimeFormate =state.timerOut -=1000
      state.timerDispaly=remainingTime(setTimeFormate);
      if(flag==state.timerOut){
        // router.go();
        location.reload();
      }
    }else {
      state.timerOut =0;
    }
    
  }, 1000)

}

const remainingTime = (value) => {
  return millisToMinutesAndSeconds(value);
}

const millisToMinutesAndSeconds = (millis) => {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return `${minutes}:${(seconds < 10 ? "0" : "")}${seconds}`;
}

/* end timer */

// set create order
export const setCreateOrder = (state, order) => {
  state.createdOrder = order;
}

export const paymentInitiate = (state, resp) => {
  state.paymentInitiateIds = resp;
}

export const downloadTicket = (state, resp)=>{
  state.downloadTicket = resp;
}

export const downloadTicketPdf = (state, resp)=>{
  state.downloadTicketPdf = resp;
}

export const errorMsg = (state, resp)=>{
  state.errorMsg = resp;
}

export const workSpaceKey = (state, resp)=>{
  state.workSpaceKey=resp
}


export const ticketFormat = (state, data)=>{
  state.ticketFormat=data;
}
