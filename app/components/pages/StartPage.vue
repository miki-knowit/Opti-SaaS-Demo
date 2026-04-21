<script setup lang="ts">
import { computed } from 'vue';
import type {
    ImageBlockItem,
    SectionBlockItem,
    TextBlockItem,
    StartPageData,
} from '~/graphql/start-page.types';
import SectionBlock from '../blocks/SectionBlock.vue';
import ImageBlock from '../blocks/ImageBlock.vue';
import TextBlock from '../blocks/TextBlock.vue';
import HeaderBlock from '../blocks/HeaderBlock.vue';

const { data, status, error } = await useFetch<StartPageData>('/api/start-page');

// The API returns the GraphQL query result shape, so the page content lives on
// the first StartPage item in the collection.
const startPage = computed(() => data.value?.StartPage?.items?.[0] ?? null);
const hasStartPage = computed(() => !!startPage.value);

const headerBlock = computed(() => startPage.value?.HeaderBlock ?? null);

const startPageBody = computed(() => startPage.value?.TextProp?.html || '');
const contentArea = computed(() => startPage.value?.ContentAreaProp ?? []);

// Filter and collect content blocks by type for rendering.
const sectionBlocks = computed(() =>
    contentArea.value.filter(
        (item): item is SectionBlockItem => item?.__typename === 'SectionBlock',
    ),
);
const imageBlocks = computed(() =>
    contentArea.value.filter((item): item is ImageBlockItem => item?.__typename === 'ImageBlock'),
);

const textBlocks = computed(() =>
    contentArea.value.filter((item): item is TextBlockItem => item?.__typename === 'TextBlock'),
);
</script>

<template>
    <div class="start-page">
        <div v-if="status === 'pending' && !hasStartPage">Loading start page content...</div>
        <div v-else-if="error && !hasStartPage">Failed to load start page content.</div>
        <section class="start-page__header">
            <img class="start-page__header-icon" src="/icon.svg" alt="Knowit Experience logo" />
            <HeaderBlock v-if="headerBlock" :header-block="headerBlock" />
        </section>

        <section class="start-page__header">
            <div v-if="startPageBody" v-html="startPageBody" />
        </section>

        <SectionBlock
            v-for="(item, index) in sectionBlocks"
            :key="`section-${index}`"
            :section-block="item"
        />

        <ImageBlock
            v-for="(item, index) in imageBlocks"
            :key="`image-${index}`"
            :image-block="item"
        />

        <TextBlock v-for="(item, index) in textBlocks" :key="`text-${index}`" :text-block="item" />
    </div>
</template>

<style scoped>
img.start-page__header-icon {
  width: 40px;
  height: 40px;
  display: block;
}
</style>
