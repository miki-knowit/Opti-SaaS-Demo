<script setup lang="ts">
import HeaderBlock from './components/blocks/HeaderBlock.vue';
import FooterBlock from './components/blocks/FooterBlock.vue';
</script>

<template>
    <div>
        <NuxtRouteAnnouncer />
        <HeaderBlock />
        <NuxtPage />
        <FooterBlock />
    </div>
</template>
