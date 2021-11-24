<template>
<div class="labelBtn">
    <router-link to="/shop" class="button btnBlack">{{$t('common.cart')}}</router-link>
</div>
</template>

<script>
export default {
    name: 'CartButton',
    setup() {
        return {}
    },
}
</script>

<style>
</style>
