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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/payment/Payment.vue')
  },
  
]

const router = createRouter({
  history: createMemoryHistory(),  //createWebHashHistory(),//
  routes
})

export default router
