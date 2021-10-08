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
    component: () => import("../views/ShoppingCart.vue")
  },
  {
    path: '/delivery-method',
    name: 'DeliveryMethod',
    component: () => import("../views/ChooseDeliveryMethod.vue")
  },
  {
    path: '/user-form',
    name: 'UserForm',
    component: () => import("../views/UserForm.vue")
  },
  {
    path: '/single-event',
    name: 'SingleEvent',
    component: () => import("../views/SingleEvent.vue")
  },

  {
    path: '/recurring-event',
    name: 'RecurringEvent',
    component: () => import("../views/RecurringEvent.vue")
  },
  {
    path: '/ticket-category',
    name: 'TicketCategory',
    component: () => import("../views/TicketCategory.vue")
  },
  {
    path: '/payment',
    name: 'Payment',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Payment.vue')
  },
  
]

const router = createRouter({
  history: createMemoryHistory(),  //createWebHashHistory(),//
  routes
})

export default router
