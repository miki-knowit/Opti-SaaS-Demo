<script setup lang="ts">
defineProps<{
    headerBlock: {
        __typename: 'HeaderBlock';
        ImageBlock?: {
            HeadingProp?: string | null;
            ImageProp?: { url?: { default?: string | null } | null } | null;
        } | null;
        Preamble?: string | null;
    };
}>();

import { ref } from 'vue';

const isOpen = ref(false);

function toggleMenu() {
  isOpen.value = !isOpen.value;
}

function closeMenu() {
  isOpen.value = false;
}
</script>

<template>
    <header class="header">
        <div class="header__container">
          
          <div class="header__text">
            <h2 v-if="headerBlock.Preamble" class="header__preamble">
              {{ headerBlock.Preamble }}
            </h2>

            <h3 v-if="headerBlock.ImageBlock?.HeadingProp" class="header__Heading">
              {{ headerBlock.ImageBlock?.HeadingProp }}
            </h3>
          </div>
          
          <figure class="header__logo">
            <NuxtLink to="/">
              <img src="/icon.svg" alt="Knowit Experience logo" />
            </NuxtLink>
          </figure>
          
          <button 
              class="header__menu-toggle" 
              @click="toggleMenu">
            Menu
          </button>

            <nav class="header__nav" :class="{ 'header__nav--open': isOpen }">
                <ul class="header__nav-list">
                    <li class="header__nav-item"><NuxtLink to="/" @click="closeMenu">Home</NuxtLink></li>
                    <li class="header__nav-item"><NuxtLink to="/about" @click="closeMenu">About</NuxtLink></li>
                </ul>
            </nav>
        </div>
    </header>
</template>

<style scoped lang="scss">
.header__menu-toggle {
  align-self: flex-end;
}

.header__nav {
  display: none;
  width: 100%;
  
  font-size: var(--font-size-large);
}

.header__nav--open {
  display: block;
}

.header__nav-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.header__nav-item {
text-decoration: none;
}

.header__content {
  width: 100%;
  padding: 0 var(--spacing-xs) var(--spacing-medium);
}

@media (min-width: 1200px) {
  .header__menu-toggle {
    display: none;
  }

  .header__nav {
    display: block;
    width: auto;
    margin-left: auto;
  }

  .header__nav-list {
    flex-direction: row;
    align-items: center;
  }
}
</style>