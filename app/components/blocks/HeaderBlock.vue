<script setup lang="ts">
import { ref } from 'vue';
import type { HeaderBlockQuery } from '~/graphql/generated';
const isOpen = ref(false);

function toggleMenu() {
    isOpen.value = !isOpen.value;
}

function closeMenu() {
    isOpen.value = false;
}

const { data } = await useFetch<HeaderBlockQuery>('/api/header-block');
const headerBlock = computed(() => data.value?.HeaderBlock?.items?.[0] ?? null);
</script>

<template>
    <header class="header">
        <figure class="header__logo" v-if="headerBlock?.Logo?.url?.default">
            <NuxtLink to="/">
                <img :src="headerBlock.Logo.url.default" alt="Site logo" />
            </NuxtLink>
        </figure>

        <button
            class="header__menu-toggle"
            type="button"
            :aria-expanded="isOpen"
            aria-controls="site-navigation"
            :aria-label="isOpen ? 'Stäng meny' : 'Öppna meny'"
            @click="toggleMenu"
        >
            <span class="header__menu-line" aria-hidden="true" />
            <span class="header__menu-line" aria-hidden="true" />
            <span class="header__menu-line" aria-hidden="true" />
        </button>

        <nav id="site-navigation" class="header__nav" :class="{ 'header__nav--open': isOpen }">
            <ul class="header__nav-links">
                <li v-for="(link, index) in headerBlock?.NavLinks" :key="index">
                    <NuxtLink
                        v-if="link?.url?.default"
                        :to="link.url.default"
                        class="header__nav-link"
                        @click="closeMenu"
                    >
                        {{ link.text }}
                    </NuxtLink>
                </li>
            </ul>
        </nav>
    </header>
</template>

<style scoped lang="scss">
.header {
    background: transparent;
    width: 100%;
    display: grid;
    grid-template-columns: minmax(120px, 1fr) auto minmax(120px, 1fr);
    align-items: center;
    column-gap: var(--spacing-md, 32px);
    padding: var(--spacing-small, 24px) 56px;
    box-sizing: border-box;
    top: 0;
    left: 0;
    z-index: 10;
    position: absolute;

    @media (max-width: 1023px) {
        grid-template-columns: auto auto;
        justify-content: space-between;
        padding: 16px 24px;
    }

    &__logo {
        grid-column: 1;
        display: flex;
        width: 120px;
        height: 43px;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        aspect-ratio: 120/43;
        margin: 0;

        img {
            display: block;
            width: 100%;
            height: auto;
        }

        @media (max-width: 1023px) {
            grid-column: 1;
        }
    }

    &__menu-toggle {
        grid-column: 3;
        justify-self: end;
        display: none;
        color: var(--palette-color-black-100);

        @media (max-width: 1023px) {
            grid-column: 2;
            position: relative;
            z-index: 12;
            display: inline-flex;
            width: 44px;
            height: 44px;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 5px;
            padding: 0;
            border: 0;
            background: transparent;
            cursor: pointer;
        }
    }

    &__menu-line {
        display: block;
        width: 24px;
        height: 2px;
        background: currentColor;
    }

    &__nav {
        font-family: var(--font-family-base);
        grid-column: 2;
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 0;

        @media (max-width: 1023px) {
            position: fixed;
            color: #fefbe6;
            top: 0;
            right: 0;
            bottom: 0;
            z-index: 11;
            width: min(82vw, 320px);
            align-items: flex-start;
            justify-content: flex-start;
            padding: 96px 32px 32px;
            background: #372bc5;
            transform: translateX(100%);
            visibility: hidden;
            pointer-events: none;
            transition:
                transform 180ms ease,
                visibility 180ms ease;

            &--open {
                transform: translateX(0);
                visibility: visible;
                pointer-events: auto;
            }
        }
    }

    &__nav-links {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: var(--spacing-xl, 48px);
        list-style: none;
        margin: 0;
        padding: 0;

        @media (max-width: 1023px) {
            width: 100%;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            gap: var(--spacing-md, 32px);
        }
    }

    &__nav-link {
        color: var(--palette-color-black-100);
        text-decoration: none;
        font-size: 2rem;
        font-weight: 400;

        @media (max-width: 1023px) {
            font-size: 1.5rem;
        }
    }
}
</style>
