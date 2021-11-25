import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
import i18n from './locales/i18n'
import vueCustomElement from 'vue-custom-element'
import '@/assets/css/style.css' //custom css file 
import '@stripe/stripe-js'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

createApp(App)
    .use(vueCustomElement)
    .use(router)
    .use(i18n)
    .use(store)
    .use(VueSweetalert2)
    .mount('vue-widget', App)

    setTimeout(() => {
        document.querySelector("vue-widget").fields = { a: "a", b: "b" };
      }, 1000);