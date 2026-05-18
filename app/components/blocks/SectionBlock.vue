<script setup lang="ts">
import ContentAreaRenderer from '../utils/ContentAreaRenderer.vue';

const props = defineProps<{
    sectionBlock: {
        __typename: 'SectionBlock';
        HeadingProp?: string | null;
        ContentAreaProp?: Array<any> | null;
    };
}>();

const isTrueSitePagePartialLayout = computed(() => {
    const items = props.sectionBlock.ContentAreaProp ?? [];

    return items.length > 0 && items.every((item) => item?.__typename === 'CommonPage');
});
</script>

<template>
    <section class="section">
        <div class="section__container">
            <div
                class="section__content"
                :class="{ 'section__content--site-page-partials': isTrueSitePagePartialLayout }"
            >
                <div v-if="sectionBlock.HeadingProp">
                    <h2 class="section__heading">{{ sectionBlock.HeadingProp }}</h2>
                </div>

                <ContentAreaRenderer :items="sectionBlock.ContentAreaProp" />
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.section {
    padding-left: 96px;
    padding-right: 96px;
    margin: 5rem 5rem;

    &__content--site-page-partials {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 400px));
        justify-content: center;
        gap: var(--section-gap-normal);
    }
}
</style>
