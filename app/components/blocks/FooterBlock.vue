<script setup lang="ts">
import type {FooterBlockQuery} from "~/graphql/generated";

const { data, status, error } = await useFetch<FooterBlockQuery>('/api/footer-block');
console.log(data)
const footerBlock = computed(() => data.value?.FooterBlock?.items?.[0] ?? null);
</script>

<template>
    <footer id="site-footer" class="footer">
        <div class="footer__content">
            <figure>
                <img src="/icon.svg" alt="logo" />
            </figure>
            <div v-if="footerBlock?.ContactHeading" class="footer__column">
                <h1 class="heading">{{ footerBlock?.ContactHeading }}</h1>
                <div class="footer__column--contact-list">
                    <p>
                        {{ footerBlock.Email }}
                    </p>
                    <p>
                        {{ footerBlock.Phone }}
                    </p>
                    <p>
                        {{ footerBlock.Address }}
                    </p>
                </div>
            </div>
            <div class="footer__column">
                <ul v-if="footerBlock?.Links?.length" class="footer__link-list">
                    <li
                        v-for="(link, index) in footerBlock.Links"
                        :key="index"
                        class="footer__link-list-item"
                    >
                        <a v-if="link?.target" :href="link?.url?.default" class="footer__link link">
                            {{ link?.text }}
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </footer>
</template>
