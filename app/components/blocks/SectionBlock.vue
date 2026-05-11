<script setup lang="ts">
import ContentAreaRenderer from '../utils/ContentAreaRenderer.vue';

defineProps<{
    sectionBlock: {
        __typename: 'SectionBlock';
        HeadingProp?: string | null;
        ContentAreaProp?: Array<any> | null;
    };
}>();
</script>

<template>
    <section class="section section--halves-xxxl">
        <div class="section__container">
            <div v-if="sectionBlock.HeadingProp" class="section__heading">
                <h2 class="heading">{{ sectionBlock.HeadingProp }}</h2>
            </div>

            <ContentAreaRenderer :items="sectionBlock.ContentAreaProp" />
        </div>
    </section>
</template>

<style scoped lang="scss">
.section {
    padding-left: 96px;
    padding-right: 96px;
    margin: 5rem 5rem;
}
</style>
