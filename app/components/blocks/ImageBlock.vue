<script setup lang="ts">
defineProps<{
  imageBlock: {
    __typename: "ImageBlock";
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
  <figcaption v-if="imageBlock.HeadingProp">
    {{ imageBlock.HeadingProp }}
  </figcaption>
  <figure v-if="imageBlock.ImageProp?.url?.default">
    <img
        :src="imageBlock.ImageProp.url.default"
        :alt="imageBlock.HeadingProp || ''"
    />
  </figure>
</template>