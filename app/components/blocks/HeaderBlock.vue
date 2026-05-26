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
        <NuxtLink class="header__logo" v-if="headerBlock?.Logo?.url?.default" to="/">
            <img :src="headerBlock.Logo.url.default" alt="Site logo" />
        </NuxtLink>

        <button
            class="header__menu-toggle"
            type="button"
            :aria-expanded="isOpen"
            aria-controls="site-navigation"
            :aria-label="isOpen ? 'Close menu' : 'Open menu'"
            @click="toggleMenu"
        >
            <span class="header__menu-line" aria-hidden="true" />
            <span class="header__menu-line" aria-hidden="true" />
            <span class="header__menu-line" aria-hidden="true" />
        </button>

        <nav id="site-navigation" class="header__nav" :class="{ 'header__nav--open': isOpen }">
            <ul class="header__nav-links menu2">
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

<style lang="scss" scoped>
@use '@scss/breakpoints' as *;

.header {
    width: 100%;
    display: grid;
    grid-template-columns: minmax(12rem, 1fr) auto minmax(12rem, 1fr);
    align-items: center;
    padding: var(--spacing-small) var(--spacing-xl);
    top: 0;
    left: 0;
    z-index: 10;
    position: absolute;

    @media (max-width: $lg) {
        grid-template-columns: auto auto;
        justify-content: space-between;
        padding: 1.6rem 2.4rem;
    }

    &__logo {
        grid-column: 1;
        height: 4.3rem;
        aspect-ratio: 120/43;
    }

    &__menu-toggle {
        grid-column: 3;
        justify-self: end;
        display: none;

        @media (max-width: $lg) {
            grid-column: 2;
            position: relative;
            z-index: 12;
            display: inline-flex;
            flex-direction: column;
            gap: 0.5rem;
        }
    }

    &__menu-line {
        display: block;
        width: 2.4rem;
        height: 0.2rem;
        background-color: var(--palette-color-black-100);
    }

    &__nav {
        grid-column: 2;
        display: flex;
        justify-content: center;

        @media (max-width: $lg) {
            position: fixed;
            color: var(--palette-color-white-100);
            top: 0;
            right: 0;
            bottom: 0;
            z-index: 11;
            width: min(82vw, 32rem);
            align-items: flex-start;
            padding: 9.6rem 3.2rem 3.2rem;
            background: var(--palette-color-blue-100);
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
        gap: var(--spacing-xl);

        @media (max-width: $lg) {
            width: 100%;
            flex-direction: column;
        }
    }

    &__nav-link {
        color: var(--text-icon-dark);

        @media (max-width: $lg) {
            color: var(--text-icon-light);
        }
    }
}
</style>
