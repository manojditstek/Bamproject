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

/* cart module  */
// This block of code check the items in cart
const isItemInCart = (cartItems, item) => {
  let index = cartItems.findIndex(x => x.id == item.id)
  if (index > -1) {
    return true
  }
  return false
}

// This block of code add item in cart
export const addCartItem = (state, item) => {
  item.quantity = getItemQtyCart(state.cart.cartItems, item) + 1;
  item.totalPrice = getItemTotalPrice(item);
  // Checking for presnce of item in the cart
  if (isItemInCart(state.cart.cartItems, item)) {
    updateCartItem(state, item)
  } else {
    state.cart.cartItems.push(item);
    totalPrice(state);
    totalQuantity(state);
  }

}

// This block of code update item in cart
export const updateCartItem = (state, updatedItem) => {
  state.cart.cartItems = state.cart.cartItems.map((cartItem) => {
    if (cartItem.id === updatedItem.id) {
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
      state.cart.cartItems = state.cart.cartItems.filter(x => x.id !== item.id)
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

// This block of code used for get single item  
const getItemQtyCart = (cartItems, item) => {
  return cartItems.filter(x => x.id === item.id)[0]?.quantity || 0
}

// This block of code used for get single item price 
const getItemTotalPrice = (item) => {
  return item.quantity * item.faceValue;
}

// This block of code calculate total price 
export const totalPrice = (state) => {
  state.cart.itemTotalAmount = state.cart.cartItems.reduce((total, next) => {
    return total + (next.quantity * next.faceValue)
  }, 0)
}

// This block of code calculate total quantity
export const totalQuantity = (state) => {
  state.cart.itemsTotalQuantity = state.cart.cartItems.reduce((total, next) => {
    return total + (next.quantity)
  }, 0)
}