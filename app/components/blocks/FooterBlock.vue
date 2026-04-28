<script setup lang="ts">
import { computed } from 'vue';
import type { FooterBlockQuery } from '~/graphql/generated';

const { data } = await useFetch<FooterBlockQuery>('/api/footer-block');
const footerBlock = computed(() => data.value?.FooterBlock?.items?.[0] ?? null);

const footerGeneral = computed(() =>
    (footerBlock.value?.ContentAreaGeneral ?? []).filter(
        (item) => item?.__typename === 'FooterLinksGeneralBlock',
    ),
);

const footerSocials = computed(() =>
    (footerBlock?.value?.ContentAreaForSocials ?? []).filter(
        (item) => item?.__typename === 'FooterSocials',
    ),
);
</script>

<template>
    <footer class="footer">
        <figure class="footer__main-logo">
            <img src="/logo_horizontal.svg" alt="logo" />
        </figure>

        <div v-if="footerGeneral.length" class="footer__general-links">
            <ul>
                <li
                    v-for="(general, generalIndex) in footerGeneral"
                    :key="general?.LinkListHeader ?? generalIndex"
                >
                    <h3 v-if="general?.LinkListHeader" class="footer__general-header">
                        {{ general.LinkListHeader }}
                    </h3>

                    <ul v-if="general?.LinkList?.length">
                        <li
                            v-for="(link, linkIndex) in general.LinkList"
                            :key="link?.url?.default ?? link?.title ?? link?.text ?? linkIndex"
                        >
                            <a v-if="link?.url?.default" :href="link.url.default">
                                {{ link.title }}
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>

        <div v-if="footerSocials.length" class="footer__social-list">
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
    align-items: center;
    gap: var(--spacing-xs, 16px);
    align-self: stretch;
    background-color: #0b0b26;

    &__main-logo {
        display: flex;
        align-self: flex-start;
    }

    &__general-links {
        list-style: none;
        font-size: 20px;
        font-family: Bagoss;
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: 29px;
        letter-spacing: 0.36px;
        text-decoration: none;
    }

    &__general-header {
        color: white;
    }
    &__general-link {
        color: white;
    }

    &__logos-group img {
        padding: 0.5rem;
        height: 1.3rem;
    }

    &__social-list ul {
        list-style: none;
        background-color: teal;
    }

    &__icon {
        height: 1.3rem;
    }
}
</style>
