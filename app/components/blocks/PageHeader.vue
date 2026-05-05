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

function buttonClick() {
    console.log('cta button clicked');
}
</script>

<template>
    <header class="page-header--start-page">
        <div v-if="pageHeader.Image?.url?.default" class="page-header__media-container">
            <img :src="pageHeader.Image.url.default" alt="Graphic Element Gradient" />
            <div class="page-header__image-gradient" />
        </div>

        <div class="page-header__text-container-wrapper">
            <div class="page-header__text-container">
                <h1 v-if="pageHeader.Header" class="page-header__heading heading-xl">
                    {{ pageHeader.Header }}
                </h1>
                <h3 v-if="pageHeader.Preamble" class="page-header__preamble base-large">
                    {{ pageHeader.Preamble }}
                </h3>
                <button
                    v-if="pageHeader?.CTALink?.text"
                    class="page-header__button"
                    @click="buttonClick"
                >
                    {{ pageHeader.CTALink.text }}
                </button>
            </div>
        </div>
    </header>
</template>

<style scoped lang="scss">
.page-header {
    &--start-page {
        position: relative;
        overflow: hidden;
        min-height: 100svh;
        width: 100vw;
    }
    &__text-container-wrapper {
        position: relative;
        height: 100%;
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        padding-top: 15rem;
        padding-left: 2rem;
        margin-left: 40px;
        color: var(--text-icon-dark, #0b0b26);
        flex-direction: column;
        z-index: 1;
    }

    &__heading {
        max-width: 700px; // from figma mock-up
    }

    &__preamble {
        max-width: 720px; // from figma mock-up
    }

    &__button {
        display: flex;
        padding: var(--button-spacing-top-bottom, 16px) var(--button-spacing-left-right, 32px);
        justify-content: center;
        align-items: center;
        gap: var(--spacing-xxs, 8px);
        width: 178px;
        height: 58px;
        cursor: pointer;
        border-radius: var(--button-border-radius, 32px);
        background: var(--button-primary-accent-background, #372bc5);
        color: var(--button-primary-accent-text, #fefbe6);

        font-family: var(--font-family-base);
        font-size: var(--font-size-base);

        &:hover {
            background: #372bc5cc;
        }
    }

    &__media-container {
        position: absolute;
        inset: 0;
        z-index: 0;
    }
    &__media-container img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 880px;
        object-fit: cover;
    }
}
</style>
