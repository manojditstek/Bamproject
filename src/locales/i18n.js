import { createI18n } from 'vue-i18n/index'
import english from './en'
import spanish from './es'
const i18n = createI18n({
    locale: 'english',
    messages:{
        english,
        spanish
    },
    fallbackLocale: 'english'
})
export default i18n;