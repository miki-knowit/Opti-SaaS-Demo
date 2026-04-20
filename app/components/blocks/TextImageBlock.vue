<script setup lang="ts">
defineProps<{
    block: {
        __typename: 'TextImageBlock';
        HeadingProp?: string | null;
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
        <div class="image-and-text-block__content">
            <div
                class="image-and-text-block__column image-and-text-block__column--half image-and-text-block__image-block"
            >
                <img
                    v-if="block.ImageBlock?.ImageProp?.url?.default"
                    :src="block.ImageBlock.ImageProp.url.default"
                    :alt="block.ImageBlock?.HeadingProp || block.HeadingProp || ''"
                />
            </div>

            <div class="image-and-text-block__column image-and-text-block__column--half">
                <h3 v-if="block.HeadingProp">{{ block.HeadingProp }}</h3>
                <div
                    v-if="block.TextBlock?.TextProp?.html"
                    v-html="block.TextBlock.TextProp.html"
                />
            </div>
        </div>
    </article>
</template>
