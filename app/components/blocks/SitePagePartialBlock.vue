<script setup lang="ts">
import type { SitePagePartialFieldsFragment } from '~/graphql/generated';

defineProps<{
    page: SitePagePartialFieldsFragment;
}>();
</script>

<template>
    <article class="site-page-partial">
        <div class="site-page-partial--partial__content">
            <img
                v-if="page.ImageProp?.url?.default"
                class="site-page-partial__image"
                :src="page.ImageProp.url.default"
                :alt="page.HeaderProp ?? ''"
            />
            <h1 v-if="page.HeaderProp" class="site-page-partial__heading heading-large">
                {{ page.HeaderProp }}
            </h1>

            <h3 v-if="page.PreambleProp" class="site-page-partial__preamble heading-small">
                {{ page.PreambleProp }}
            </h3>
            <!-- Currenty triggers a warning in Vue Router for non-existant location, safe to ignore. -->
            <NuxtLink
                v-if="page?._metadata?.url?.default"
                :to="page._metadata.url.default"
                :aria-label="`Go to ${page.HeaderProp ?? 'page'}`"
            >
                <img
                    src="/icons/arrow_icon.svg"
                    class="site-page-partial--arrow-icon"
                    alt="arrow-icon"
                />
            </NuxtLink>
        </div>
    </article>
</template>

<style scoped lang="scss">
.site-page-partial {
    &__image {
        border-radius: 75px;
        height: 400px;
        width: 400px;
    }

    &--arrow-icon {
        width: 32px;
        height: 32px;
        border-radius: 0;
        max-width: fit-content;
    }
}
</style>
