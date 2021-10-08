<template>
<div>
    <select v-model="$i18n.locale">
        <option v-for="(lang, i) in langs" :key="`lang-${i}`" :value="lang">
            {{ lang }}
        </option>
    </select>
</div>
</template>

<script>
export default {
    name: 'SwitchLocale',
    data() {
        return {
            langs: ['en', 'es']
        }
    }
}
</script>
