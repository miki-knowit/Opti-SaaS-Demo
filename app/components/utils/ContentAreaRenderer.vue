<script setup lang="ts">
defineProps<{
    /**
     * CMS content area items returned from Optimizely Graph.
     * Each item must include `__typename` so the renderer can choose a block component.
     */
    items?: Array<any> | null;
}>();
</script>

<template>
    <template v-for="(item, index) in items ?? []" :key="`${item?.__typename ?? 'item'}-${index}`">
        <SectionBlock v-if="item?.__typename === 'SectionBlock'" :section-block="item" />
        <TextImageBlock v-else-if="item?.__typename === 'TextImageBlock'" :block="item" />
        <TextBlock v-else-if="item?.__typename === 'TextBlock'" :text-block="item" />
        <SitePagePartialBlock
            v-else-if="item?.__typename === 'CommonPage' && item?._metadata?.url?.default"
            :page="item"
        />
    </template>
</template>
