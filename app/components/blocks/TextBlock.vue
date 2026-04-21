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
        <div
            v-if="textBlock.TextProp?.html"
            v-html="textBlock.TextProp.html"
            class="text-block__text"
        />
    </div>
</template>
