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
@use '@scss/breakpoints' as *;

.section {
    padding-left: 9.6rem;
    padding-right: 9.6rem;
    margin: 5rem 5rem;

    &__content--site-page-partials {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(32rem, 40rem));
        justify-content: center;
        gap: var(--section-gap-normal);
    }

    /* Mobile screens and up to 576px */
    @media (max-width: $sm) {
        padding: 0 1rem 0 1rem;
        margin: 1rem;
    }
}
</style>
