<script setup lang="ts">
import { computed } from 'vue';
import type { FooterBlockQuery } from '~/graphql/generated';

const { data } = await useFetch<FooterBlockQuery>('/api/footer-block');
const footerBlock = computed(() => data.value?.FooterBlock?.items?.[0] ?? null);

// General content area, for link lists and text lists
const footerGeneralBlocks = computed(() => footerBlock.value?.ContentAreaGeneral ?? []);

// Socials content area
const footerSocials = computed(() =>
    (footerBlock?.value?.ContentAreaForSocials ?? []).filter(
        (item) => item?.__typename === 'FooterSocials',
    ),
);

const socialsHeader = computed(() => footerBlock.value?.SocialsHeader ?? null);
</script>

<template>
    <footer class="footer">
        <div class="footer__divider"></div>

        <div class="footer__logos">
            <figure class="footer__main-logo">
                <img src="/logo_horizontal.svg" alt="logo" />
            </figure>
        </div>

        <div v-if="footerGeneralBlocks.length" class="footer__general-list base">
            <ul>
                <li
                    v-for="(general, generalIndex) in footerGeneralBlocks"
                    :key="`${general?.__typename ?? 'footer-general'}-${generalIndex}`"
                >
                    <!-- two templates to preserve order from the content area -->
                    <template v-if="general?.__typename === 'FooterLinksGeneralBlock'">
                        <h3
                            v-if="general?.LinkListHeader"
                            class="footer__general-header heading-xs"
                        >
                            {{ general.LinkListHeader }}
                        </h3>

                        <ul v-if="general?.LinkList?.length">
                            <li
                                v-for="(link, linkIndex) in general.LinkList"
                                :key="link?.url?.default ?? linkIndex"
                            >
                                <a v-if="link?.url?.default" :href="link.url.default">
                                    {{ link.title }}
                                </a>
                            </li>
                        </ul>
                    </template>

                    <template v-else-if="general?.__typename === 'FooterTextGeneralBlock'">
                        <h3 v-if="general.TextListHeader" class="footer__general-header heading-xs">
                            {{ general.TextListHeader }}
                        </h3>

                        <ul v-if="general.ContentAreaForTextRows?.length">
                            <li
                                v-for="(text, textIndex) in general.ContentAreaForTextRows"
                                :key="textIndex"
                            >
                                <p>{{ text?.TextRow }}</p>
                                <!-- TS warns for type safety here... really messy solution to check for typesafety with === operator-->
                            </li>
                        </ul>
                    </template>
                </li>
            </ul>
        </div>

        <div v-if="footerSocials.length" class="footer__social-list base">
            <h3 v-if="socialsHeader" class="footer__socials-header base-large">
                {{ socialsHeader }}
            </h3>
            <ul>
                <li
                    v-for="(item, itemIndex) in footerSocials"
                    :key="item?.Link?.default ?? itemIndex"
                >
                    <img :src="item?.Icon?.url?.default" class="footer__icon" />
                    <p>{{ item.Title }}</p>
                </li>
            </ul>
        </div>
    </footer>
</template>

<style lang="scss" scoped>
.footer {
    display: flex;
    padding: 64px 160px;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-xs);
    align-self: stretch;
    background-color: var(--palette-color-black-100);

    & ul {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    &__logos {
        order: 4;
        display: flex;
        flex-direction: column;
        align-self: flex-start;
        gap: var(--spacing-xs);
    }

    &__divider {
        order: 3;
        width: 100%;
        height: 2px;
        background-color: var(--palette-color-white-100);
    }

    &__general-list {
        order: 1;
        width: 100%;
        > ul {
            display: flex;
            flex-direction: row;
            gap: var(--spacing-lg);
        }

        > ul > li {
            display: flex;
            flex-direction: column;
            flex: 1;
            gap: var(--spacing-xxs);
            color: white; // text is not styled on a default level (color, e.g. adress & kontakt)
        }
    }

    &__social-list {
        order: 2;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: var(--spacing-xs);

        > ul {
            display: flex;
            flex-direction: column;
            gap: var(--spacing-lg);
        }

        > ul > li {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: var(--spacing-xs); // does not align with figma value (12px)
            color: white; // TODO: should be set by default (among other variables)
        }

        p {
            margin: 0;
        }
    }

    &__general-header,
    &__socials-header {
        color: white;
    }

    // Override necessary because img globals screw up layout
    &__icon {
        width: 1.3rem;
        height: 1.3rem;
        flex: 0 0 auto;
    }
}
</style>
