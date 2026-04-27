<script setup lang="ts">
import { ref } from 'vue';
import type { HeaderBlockQuery } from '~/graphql/generated'
const isOpen = ref(false);

function toggleMenu() {
    isOpen.value = !isOpen.value;
}

function closeMenu() {
    isOpen.value = false;
}

const { data, status, error } = await useFetch<HeaderBlockQuery>('/api/header-block');
const headerBlock = computed(() => data.value?.HeaderBlock?.items?.[0] ?? null);
</script>

<template>
  <header class="header">
    <div class="header__container">
      <figure class="header__logo" v-if="headerBlock?.Logo?.url?.default">
      <NuxtLink to="/">
        <img :src="headerBlock.Logo.url.default" alt="Site logo" />
      </NuxtLink>
    </figure>

      <button class="header__menu-toggle" @click="toggleMenu">
        Meny
      </button>

      <nav class="header__nav" :class="{ 'header__nav--open': isOpen }">
      <ul class="header__nav-list">
        <li
            v-for="(link, index) in headerBlock?.NavLinks"
            :key="index"
            class="header__nav-item"
        >
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
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  background: var(--header-background-alternative, rgba(254, 251, 230, 0.00));
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: flex-start;
  position: absolute;

  &__nav {
    display: none;
    padding: 4px var(--spacing-xxl, 72px) 0 0;
    align-items: center;
    gap: var(--spacing-xl, 48px);

    &--open {
      display: block;
    }
  }
  
  &__nav-list {
    display: flex;
    gap: 10px;
  }
  
  &__nav-item {
    display: flex;
    align-items: center;

    color: var(--palette-color-black-100);
    text-decoration: none;
  }
  
  &__nav-link {
    color: var(--palette-color-black-100);
    gap: var(--spacing-xxs, 8px);
    text-decoration: none;
    font-size: 2rem;
    font-weight: 400;
  }
  
  &__logo {
    display: flex;
    width: 120px; // TODO: fix the hamburger menu and the logo being out of pos.
    height: 43px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    aspect-ratio: 120/43;
  }
  
  &__menu-toggle {
    color: var(--palette-color-black-100);
    justify-content: flex-end;
  }
  
}

.header__container {
  background: var(--header-background-alternative, rgba(254, 251, 230, 0.00));
  width: 100%;
  padding: var(--spacing-small, 24px) 56px;
  justify-content: space-between;
  align-items: center;
}
</style>