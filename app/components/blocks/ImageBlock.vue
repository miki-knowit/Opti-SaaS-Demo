<script setup lang="ts">
defineProps<{
    imageBlock: {
        __typename: 'ImageBlock';
        HeadingProp?: string | null;
        ImageProp?: {
            url?: {
                default?: string | null;
            } | null;
        } | null;
        PlaceImageRight?: boolean; // named PlaceImageRight in the CMS
    };
}>();
</script>

<template>
    <div class="image-block">
        <div
            class="image-block__content"
            :class="{ 'image-block__content--align-top': imageBlock.PlaceImageRight }"
        >
            <figure v-if="imageBlock.ImageProp?.url?.default" class="image-block__image-container">
                <figcaption v-if="imageBlock.HeadingProp" class="image-block__caption">
                    {{ imageBlock.HeadingProp }}
                </figcaption>
                <img :src="imageBlock.ImageProp.url.default" :alt="imageBlock.HeadingProp || ''" />
            </figure>
        </div>
    </div>
</template>

<style scoped>
.image-block {
    display: flex;
    justify-content: center;
    align-items: center;
}

.image-block__content {
    width: 100%;
    max-width: 200px;
    max-height: 200px;
}

.image-block__content--align-top {
    align-self: flex-start;
}
</style>
