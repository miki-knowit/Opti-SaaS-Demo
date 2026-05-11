<script setup lang="ts">
import { computed } from 'vue';
import type { OmOssQuery } from '~/graphql/generated';
import ContentAreaRenderer from '../utils/ContentAreaRenderer.vue';

const { data, status, error } = await useFetch<OmOssQuery>('/api/om-oss');

const commonPage = computed(() => data.value?.CommonPage?.items?.[0] ?? null);
const contentArea = computed(() => commonPage.value?.ContentAreaProp ?? []);
</script>

<template>
    <main class="common-page">
        <div v-if="status === 'pending' && !commonPage">Loading page...</div>
        <div v-else-if="error && !commonPage">Failed to load page.</div>

        <div class="header-wrapper">
            <h1 class="heading-xl">{{ commonPage?.HeaderProp }}</h1>
            <h2 class="heading-medium">{{ commonPage?.PreambleProp }}</h2>
        </div>

        <img
            v-if="commonPage?.ImageProp?.url?.default"
            class="common-page__hero-image"
            :src="commonPage.ImageProp.url.default"
        />

        <ContentAreaRenderer :items="contentArea" />
    </main>
</template>

<style scoped>
.common-page {
    min-height: 100svh;
}

.common-page__hero-image {
    width: 800px;
    height: 550px;
    margin-left: auto;
    margin-right: 40px;
    border-radius: 80px;
}

.header-wrapper {
    margin-top: 10rem;
}
</style>
