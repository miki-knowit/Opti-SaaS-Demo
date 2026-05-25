<script setup lang="ts">
defineProps<{
    block: {
        __typename: 'TextImageBlock';
        HeadingProp?: string | null;
        PlaceImageRight?: boolean | null;
        TextBlock?: { TextProp?: { html?: string | null } | null } | null;
        ImageBlock?: {
            HeadingProp?: string | null;
            ImageProp?: { url?: { default?: string | null } | null } | null;
        } | null;
    };
}>();
</script>

<template>
    <article class="section__item image-and-text-block">
        <div
            class="image-and-text-block__content"
            :class="{ 'image-and-text-block__content--image-right': block.PlaceImageRight }"
        >
            <img
                v-if="block.ImageBlock?.ImageProp?.url?.default"
                class="image-and-text-block__image"
                :src="block.ImageBlock.ImageProp.url.default"
                :alt="block.ImageBlock?.HeadingProp || block.HeadingProp || ''"
            />

            <div class="image-and-text-block__text">
                <h2 v-if="block.HeadingProp">{{ block.HeadingProp }}</h2>
                <div
                    v-if="block.TextBlock?.TextProp?.html"
                    v-html="block.TextBlock.TextProp.html"
                />
            </div>
        </div>
    </article>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/breakpoints' as *;

.image-and-text-block {
    &__content {
        display: flex;
    }

    &__content--image-right {
        flex-direction: row-reverse;
    }

    &__image,
    &__text {
        flex: 1 1 0;
    }

    &__image {
        object-fit: cover;
        border-radius: var(--border-radius-medium);
    }

    &__text {
        justify-content: center;
        gap: var(--spacing-small);
        padding: var(--spacing-small) var(--section-gap-normal);
    }

    /* Mobile screens and up to 576px */
    @media (max-width: $sm) {
        &__content {
            display: flex;
            flex-direction: column;
        }
    }
}
</style>
