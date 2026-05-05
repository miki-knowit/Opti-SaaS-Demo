<script setup lang="ts">
import TextImageBlock from './TextImageBlock.vue';

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

            <TextImageBlock
                v-for="(item, index) in (sectionBlock.ContentAreaProp ?? []).filter(
                    (i) => i?.__typename === 'TextImageBlock',
                )"
                :key="index"
                :block="item"
            />
        </div>
        <button class="round-button"></button>
    </section>
</template>

<style scoped lang="scss">
.section {
    padding-left: 96px;
    padding-right: 96px;
}

// MVP OF A BUTTON, DOES NOT FOLLOW STYLEGUIDE
.round-button {
    --round-button-size: 3.5rem;
    --round-button-background: var(--palette-color-black-transparent-80);
    --round-button-border-color: var(--palette-color-white-100);
    --round-button-border-width: 0.1rem;
    --round-button-icon-size: 1.8rem;
    --round-button-icon-color: var(--palette-color-white-100);

    width: var(--round-button-size);
    height: var(--round-button-size);
    padding: 0;
    border: 0;
    border-radius: 50%;
    background: var(--round-button-background);
    box-shadow: inset 0 0 0 var(--round-button-border-width) var(--round-button-border-color);
    display: grid;
    place-items: center;
    cursor: pointer;

    &::before {
        content: '';
        width: var(--round-button-icon-size);
        height: var(--round-button-icon-size);
        background-color: var(--round-button-icon-color);
        mask: url('~/assets/icons/arrow_icon.svg') center / contain no-repeat;
        -webkit-mask: url('~/assets/icons/arrow_icon.svg') center / contain no-repeat;
    }

    &:hover,
    &:focus-visible {
        --round-button-background: var(--palette-color-white-100);
        --round-button-border-color: var(--palette-color-black-100);
        --round-button-icon-color: var(--palette-color-black-100);
    }
}
</style>
