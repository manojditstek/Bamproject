import {
    createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
import i18n from './locales/i18n'
import vueCustomElement from 'vue-custom-element'
import '@/assets/css/style.css' //custom css file 


createApp(App).use(vueCustomElement)
createApp(App)
    .use(router)
    .use(i18n)
    .use(store)
    .mount('vue-widget', App)