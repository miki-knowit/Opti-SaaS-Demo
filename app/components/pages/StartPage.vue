<script setup lang="ts">
import { computed } from 'vue';
import type { StartPageQuery } from '~/graphql/generated';
import PageHeader from '../blocks/PageHeader.vue';
import ContentAreaRenderer from '../utils/ContentAreaRenderer.vue';

const label = 'startpage';
const start = performance.now();

if (import.meta.server) {
    console.log(`[SSR] ${label} START ${Math.round(start)}ms`);
}

const { data, status, error } = await useFetch<StartPageQuery>('/api/start-page');

const end = performance.now();

if (import.meta.server) {
    console.log(`[SSR] ${label} END ${Math.round(end)}ms took ${Math.round(end - start)}ms`);
}

// The API returns the GraphQL query result shape, so the page content lives on
// the first StartPage item in the collection.
const startPage = computed(() => data.value?.StartPage?.items?.[0] ?? null);
const hasStartPage = computed(() => !!startPage.value);
const pageHeader = computed(() => startPage.value?.PageHeader ?? null);
const contentArea = computed(() => startPage.value?.ContentAreaProp ?? []);
</script>

<template>
    <div class="start-page">
        <div v-if="status === 'pending' && !hasStartPage">Loading start page content...</div>
        <div v-else-if="error && !hasStartPage">Failed to load start page content.</div>

        <PageHeader v-if="pageHeader" :page-header="pageHeader" />

        <ContentAreaRenderer :items="contentArea" />
    </div>
</template>
