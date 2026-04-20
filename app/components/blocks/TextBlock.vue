<script setup lang="ts">
    defineProps<{
      textBlock: {
        __typename: 'TextBlock';
        TextProp?: { html?: string | null } | null;
      };
    }>();
</script>

<template>
<div class="text-block__wrapper">
  <div v-if="textBlock.TextProp?.html" v-html="textBlock.TextProp.html" class="text-block__text" />
</div>
</template>

<style scoped>
.text-block__text {
  color: #372bc5;
  font-size: var(--font-size-large);
  font-weight: var(--font-weight-extrabold);
}
</style>