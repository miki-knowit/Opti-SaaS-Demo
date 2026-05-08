<script setup lang="ts">
import { computed } from 'vue';
import type { SectionBlockItem, StartPageData } from '~/graphql/start-page.types';
import SectionBlock from '../blocks/SectionBlock.vue';
import PageHeader from '../blocks/PageHeader.vue';

const { data, status, error } = await useFetch<StartPageData>('/api/start-page');

// The API returns the GraphQL query result shape, so the page content lives on
// the first StartPage item in the collection.
const startPage = computed(() => data.value?.StartPage?.items?.[0] ?? null);
const hasStartPage = computed(() => !!startPage.value);

const pageHeader = computed(() => startPage.value?.PageHeader ?? null);

const contentArea = computed(() => startPage.value?.ContentAreaProp ?? []);

// Filter and collect ContentArea blocks by type for rendering.
const sectionBlocks = computed(() =>
    contentArea.value.filter(
        (item): item is SectionBlockItem => item?.__typename === 'SectionBlock',
    ),
);
</script>

<template>
    <div class="start-page">
        <div v-if="status === 'pending' && !hasStartPage">Loading start page content...</div>
        <div v-else-if="error && !hasStartPage">Failed to load start page content.</div>

        <PageHeader v-if="pageHeader" :page-header="pageHeader" />

        <SectionBlock
            v-for="(item, index) in sectionBlocks"
            :key="`section-${index}`"
            :section-block="item"
        />
    </div>
</template>
