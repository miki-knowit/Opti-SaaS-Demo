<script setup lang="ts">
import StartPage from './components/pages/StartPage.vue';
import HeaderBlock from './components/blocks/HeaderBlock.vue'
import FooterBlock from './components/blocks/FooterBlock.vue'
</script>

<template>
    <div>
        <NuxtRouteAnnouncer />
      <HeaderBlock />
        <StartPage />
      <FooterBlock />
    </div>
</template>
