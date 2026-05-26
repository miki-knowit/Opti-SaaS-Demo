<script setup lang="ts">
defineProps<{
    pageHeader: {
        Header?: string | null;
        Preamble?: string | null;
        Image?: {
            url?: {
                default?: string | null;
            } | null;
        } | null;
        CTALink?: {
            text?: string | null;
            url?: {
                default?: string | null;
            } | null;
        } | null;
    };
}>();
</script>

<template>
    <header class="page-header--start-page">
        <div v-if="pageHeader.Image?.url?.default" class="page-header__media-container">
            <img :src="pageHeader.Image.url.default" alt="Graphic Element Gradient" />
        </div>

        <div class="page-header__text-container">
            <h1 v-if="pageHeader.Header" class="page-header__heading">
                {{ pageHeader.Header }}
            </h1>
            <p v-if="pageHeader.Preamble" class="page-header__preamble base-large">
                {{ pageHeader.Preamble }}
            </p>
            <button v-if="pageHeader?.CTALink?.text" class="page-header__button">
                <span>{{ pageHeader.CTALink.text }}</span>
            </button>
        </div>
    </header>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/breakpoints' as *;

.page-header {
    &--start-page {
        position: relative;
        overflow: hidden;
        width: 100vw;

        @media (max-width: $sm) {
            min-height: 95svh;
        }
    }
    &__text-container {
        position: relative;
        display: flex;
        flex-direction: column;
        padding: 20rem 0 15rem 6rem;
        gap: var(--spacing-small);
        z-index: 1;
        text-wrap: balance;
    }

    &__heading,
    &__preamble {
        max-width: 720px;
    }

    &__button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 178px;
        height: 58px;
        border-radius: var(--button-small-border-radius);
        background: var(--button-primary-accent-background);
        color: var(--button-primary-accent-text);
        border: 1px solid var(--button-primary-accent-background);

        &:hover {
            background: var(--button-primary-accent-hover-background);
            color: var(--button-primary-accent-hover-text);
        }
    }

    &__media-container {
        position: absolute;
        inset: 0;
        z-index: 0;
    }
    &__media-container img {
        height: 100%;
        object-fit: cover;
    }
}
</style>
