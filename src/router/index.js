import { createRouter, createWebHashHistory ,createMemoryHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/shop',
    name: 'ShoppingCart',
    component: () => import("../views/ShoppingCart/ShoppingCart.vue")
  },
  {
    path: '/delivery-method',
    name: 'DeliveryMethod',
    component: () => import("../views/deliveryMethod/ChooseDeliveryMethod.vue")
  },
  {
    path: '/user-form',
    name: 'UserForm',
    component: () => import("../views/userDetails/UserForm.vue")
  },
  {
    path: '/single-event',
    name: 'SingleEvent',
    component: () => import("../views/events/SingleEvent.vue")
  },

  {
    path: '/single-event-with-time-slots',
    name: 'SingleEventWithTimeSlot',
    component: () => import("../views/events/SingleEventWithTimeSlot.vue")
  }, 

  {
    path: '/recurring-event',
    name: 'RecurringEvent',
    component: () => import("../views/events/RecurringEvent.vue")
  },
  {
    path: '/ticket-category',
    name: 'TicketCategory',
    component: () => import("../views/ShoppingCart/TicketCategory.vue")
  },
  {
    path: '/payment',
    name: 'Payment',
    component: () => import('../views/payment/Payment.vue')
  },

  {
    path: '/download-ticket',
    name: 'DownloadTicket',
    component: () => import('../views/downloadTicket/DownloadTicket.vue')
  },
  
]
 
const router = createRouter({
  history: createMemoryHistory(),  //createWebHashHistory(),//
  routes
})

export default router
