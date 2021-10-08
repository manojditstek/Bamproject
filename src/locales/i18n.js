import { createI18n } from 'vue-i18n'
import English from './en'
import Spanish from './es'
const i18n = createI18n({
    locale: 'en',
    messages:{
        English,
        Spanish
    },
    fallbackLocale: 'en'
})
export default i18n;