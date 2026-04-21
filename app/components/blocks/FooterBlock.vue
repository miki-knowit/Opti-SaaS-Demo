<script setup lang="ts">
defineProps<{
    footerBlock: {
        __typename?: 'FooterBlock';
        ContactHeading?: string | null;
        Email?: string | null;
        Phone?: string | null;
        Address?: string | null;
        Links?: Array<{
            __typename?: 'Link';
            text?: string | null;
            target?: string | null;
            title?: string | null;
            url?: {
                default?: string | null;
            } | null;
        } | null> | null;
    } | null;
}>();
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
