<script setup lang="ts">
import { computed } from 'vue';
import type { OmOssQuery } from '~/graphql/generated';
import ContentAreaRenderer from '../utils/ContentAreaRenderer.vue';

const label = 'Om oss';
const start = performance.now();

if (import.meta.server) {
    console.log(`[SSR] ${label} START ${Math.round(start)}ms`);
}

const { data, status, error } = await useFetch<OmOssQuery>('/api/om-oss');

const end = performance.now();

if (import.meta.server) {
    console.log(`[SSR] ${label} END ${Math.round(end)}ms took ${Math.round(end - start)}ms`);
}

const commonPage = computed(() => data.value?.CommonPage?.items?.[0] ?? null);
const contentArea = computed(() => commonPage.value?.ContentAreaProp ?? []);

if (import.meta.server) {
    console.log(`[SSR] / Om oss-page fetch took ${Math.round(end - start)}ms`);
}

if (import.meta.client) {
    console.log(`[Client] / Om oss-page fetch took ${Math.round(end - start)}ms`);
}
</script>

<template>
    <main class="common-page">
        <section class="common-page__hero">
            <div v-if="status === 'pending' && !commonPage">Loading page...</div>
            <div v-else-if="error && !commonPage">Failed to load page.</div>
            <div class="common-page__text">
                <h1 class="heading-xl">{{ commonPage?.HeaderProp }}</h1>
                <p class="base-large">{{ commonPage?.PreambleProp }}</p>
            </div>

            <img
                v-if="commonPage?.ImageProp?.url?.default"
                class="common-page__image"
                :src="commonPage.ImageProp.url.default"
                :alt="commonPage?.HeaderProp ?? ''"
            />
        </section>

        <ContentAreaRenderer :items="contentArea" />
    </main>
</template>

<style scoped lang="scss">
/** TODO: should not be grid */
.common-page {
    &__hero {
        background-color: var(--palette-color-pink-80);
        min-height: 70svh;
        padding: 14rem 5.6rem 7.2rem;
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(280px, 520px);
        align-items: center;
        gap: var(--section-gap-normal);
    }

    &__text {
        max-width: 720px;
    }

    &__image {
        width: 100%;
        max-width: 520px;
        aspect-ratio: 4 / 3;
        height: auto;
        object-fit: cover;
        border-radius: var(--border-radius-medium);
        justify-self: end;
    }
}
</style>
