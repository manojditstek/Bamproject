/* This block of code set the mutltiple event */
export const setEvents = (state, events) => {
  state.events = events;
}

/* This block of code set the single event */
export const setEvent = (state, event) => {
  state.event = event;
}

/* This block of code set the recurring evevnt */
export const setRecurringEvent = (state, event)=>{
  state.recurringEvent = event;
}

/* This block of code set the time slot event */
export const setEventWithTimeSlot = (state, eventWithTimeSlot)=>{
  state.singleEventWithTimeSlot = eventWithTimeSlot;
}

/* This block of code set the time slot */
export const setTimeSlots = (state,timeSlot)=>{
  state.timeSlot = timeSlot;
}

/* This block of code set the venue address */
export const setVenue = (state, venue)=>{
  state.venueAddress = venue;
}

/* This block of code set the loader status */
export const loadingStatus = (state, newLoadingState)=>{
  state.loadingStatus = newLoadingState
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
    data.item.discounts = []; 
    data.item.totalDiscount = 0; 
    state.cart.cartItems.push(data.item);
    totalPrice(state,0);
    totalQuantity(state);
  }

}


// This block of code update item in cart
export const updateCartItem = (state, updatedItem) => {
  state.cart.cartItems = state.cart.cartItems.map((cartItem) => {
    if (cartItem.id === updatedItem.id && cartItem.timeSlotId === updatedItem.timeSlotId) {
      updatedItem.discounts = cartItem.discounts;
      updatedItem.totalDiscount = cartItem.totalDiscount;
      return updatedItem;
    }
    return cartItem;
  })
  totalPrice(state);
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
      totalPrice(state);
      totalQuantity(state); 
    } else {
      item.quantity = quantity
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
  state.cart.cartItems = [];
  state.cart.itemsTotalQuantity=0;
  state.cart.itemTotalAmount=0;
  state.errorMsg=null;
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
export const totalPrice = (state) => {
  let itemTotalAmount = 0
  state.cart.cartItems.forEach(element => {
    let discountItem = 0
    element.discounts.forEach(discount => {
      discountItem = discountItem + discount.value;
    })
    element.totalDiscount = discountItem
    itemTotalAmount = itemTotalAmount + (element.quantity * element.faceValue) - element.totalDiscount
  })
  state.cart.itemTotalAmount = itemTotalAmount
}



// This block of code calculate total quantity
export const totalQuantity = (state) => {
  state.cart.itemsTotalQuantity = state.cart.cartItems.reduce((total, next) => {
    return total + (next.quantity)
  }, 0)
}



/* discount module */

//add discount in cart
export const addDiscountToCart = (state, data) => {
  let itemId = data.ticketId
  let timeSlotId = data.timeSlotId
  state.cart.cartItems.forEach(element => {
    data.discount.quantity = getItemQtyDiscount(state,element.discounts, data) + 1;
    // data.overAllQuantity = getOverAllQtyCart(element.discounts, data) + 1;
    if (isItemInDiscountCart(state,element.discounts, data)) {
      updateCartDiscountItem(element.discounts, data.discount)
    } else if(element.id == itemId && timeSlotId === element.timeSlotId) {
      element.discounts.push(data.discount);
      totalPrice(state);
    }
  });  
}

// Updating discount item
export const updateCartDiscountItem = (item, updatedItem) => {
  item = item.map((cartItem) => {
    if (cartItem.id === updatedItem.id) {
      return updatedItem;
    }
    
    return cartItem;
    
  })
}



export const removeDiscountToCart = (state, data) => {
  let itemId = data.ticketId
  let timeSlotId = data.timeSlotId
  state.cart.cartItems.forEach(element => {
    if(element.id == itemId && timeSlotId === element.timeSlotId){
      // let quantity = getItemQtyDiscount(state,element.discounts, data) - 1;
      element.discounts = element.discounts.filter(x => x.id !== data.discount.id)
       updateCartDiscountItem(element.discounts, data.discount);
      totalPrice(state);
    }
  })
}


// Checking discount item in cart
const isItemInDiscountCart = (state,discountItems, item) => {
  console.log('discountItems',discountItems)
  let tempId = null;
  state.cart.cartItems.forEach(element => {
    tempId=element.id;
  });
  let index = discountItems.findIndex(x => x.id === item.discount.id && tempId===item.ticketId)
  if (index > -1) {
    return true
  }
  return false
}


// Checking discount quantity
const getItemQtyDiscount = (state,discountItems, item) => {
  let tempId = null;
  state.cart.cartItems.forEach(element => {
    tempId=element.id;
  });
  let qty = discountItems.filter(x => x.id === item.discount.id && tempId===item.ticketId )[0]?.quantity || 0
  return qty
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

// Helper method for timer 
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
// set payment data
export const paymentInitiate = (state, resp) => {
  state.paymentInitiateIds = resp;
}

// set download ticket data
export const downloadTicketPdf = (state, resp)=>{
  state.downloadTicketPdf = resp;
}

// set error messages
export const errorMsg = (state, resp)=>{
  state.errorMsg = resp;
}

// set work space key
export const workSpaceKey = (state, resp)=>{
  state.workSpaceKey=resp
}

// set ticket format
export const ticketFormat = (state, data)=>{
  state.ticketFormat=data;
}
