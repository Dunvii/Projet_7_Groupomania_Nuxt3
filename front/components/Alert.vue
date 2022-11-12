<script setup lang="ts">

import { alertShow } from '~/stores/objects';

</script>
<template lang="">
    <p v-if="alertShow.toggleAlert" :class="{ 'alert-error': alertShow.alertError, 'alert-success': alertShow.alertSuccess, 'alert-warning': alertShow.alertWarning }">{{ alertShow.alertMsg }}</p>
</template>

