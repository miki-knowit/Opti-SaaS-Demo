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
            :class="{
                'image-and-text-block__content--image-right': block.PlaceImageRight,
                'image-and-text-block__content--image-left': !block.PlaceImageRight,
            }"
        >
            <div class="image-and-text-block__column--image">
                <img
                    class="image-and-text-block__image"
                    v-if="block.ImageBlock?.ImageProp?.url?.default"
                    :src="block.ImageBlock.ImageProp.url.default"
                    :alt="block.ImageBlock?.HeadingProp || block.HeadingProp || ''"
                />
            </div>

            <div class="image-and-text-block__column--text-container">
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
.image-and-text-block {
    width: 100%;
}

.image-and-text-block__content {
    display: flex;
    width: 100%;
    align-items: stretch;
}

.image-and-text-block__content--image-right {
    flex-direction: row-reverse;
}

.image-and-text-block__column--image,
.image-and-text-block__column--text-container {
    flex: 1 1 0;
}

.image-and-text-block__column--image {
    min-height: 468px;
}

.image-and-text-block__image {
    border-radius: var(--border-radius-medium);
}

.image-and-text-block__column--text-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: var(--spacing-small);
    padding: var(--spacing-small) var(--section-gap-normal);
}
</style>
