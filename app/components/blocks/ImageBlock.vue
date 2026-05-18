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
    };
}>();
</script>

<template>
    <figure v-if="imageBlock.ImageProp?.url?.default" class="image-block">
        <figcaption v-if="imageBlock.HeadingProp" class="image-block__caption">
            {{ imageBlock.HeadingProp }}
        </figcaption>
        <img
            :src="imageBlock.ImageProp.url.default"
            :alt="imageBlock.HeadingProp || 'Image not available.'"
        />
    </figure>
</template>
