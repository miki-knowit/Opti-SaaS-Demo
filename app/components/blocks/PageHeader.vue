<script setup lang="ts">
defineProps<{
  pageHeader: {
    Header?: string | null;
    Preamble?: string | null;
    Image?: {
      url?: {
        default?: string | null;
      } | null;
    } | null;
    CTALink?: {
      text?: string | null;
      url?: {
        default?: string | null;
      } | null;
    } | null;
  }
}>();
</script>

<template>
    <header class="page-header page-header--start-page">
      <div v-if="pageHeader.Image?.url?.default" class="page-header__media-container">
        <img
            :src="pageHeader.Image.url.default"
            alt="Graphic Element Gradient"
        />
        <div class="page-header__image-gradient" />
      </div>

      <div class="page-header__text-container-wrapper">
        <div class="page-header__text-container">
          <h1 v-if="pageHeader.Header" class="page-header__heading">
            {{ pageHeader.Header }}
          </h1>
          <h3 v-if="pageHeader.Preamble" class="page-header__preamble">
            {{ pageHeader.Preamble }}
          </h3>
          <button v-if="pageHeader?.CTALink?.text" class="page-header__button">
            {{ pageHeader.CTALink.text }}
          </button>
        </div>
      </div>
    </header>
</template>

<style scoped lang="scss">
.page-header {
  &__text-container-wrapper {
    margin-left: 40px;
    color: var(--text-icon-dark, #0B0B26);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  &__heading {
    font-family: Bagoss;
    font-size: 54px;
    font-style: normal;
    font-weight: 400;
    line-height: 65px; /* 120.37% */
    max-width: 700px;
  }
  
  &__preamble {
    font-family: Bagoss;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 28px; /* 140% */
    max-width: 720px;
  }
  
  &__button {
    display: flex;
    padding: var(--button-spacing-top-bottom, 16px) var(--button-spacing-left-right, 32px);
    justify-content: center;
    align-items: center;
    gap: var(--spacing-xxs, 8px);
    width: 178px; // TODO: fix hardcoded values
    height: 58px; // TODO: fix hardcoded values

    border-radius: var(--button-border-radius, 32px);
    background: var(--button-primary-accent-background, #372BC5);

    color: var(--button-primary-accent-text, #FEFBE6);

    font-family: Bagoss;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 26px; /* 144.444% */
  }
  
  &__hamburger {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
}

.page-header--start-page {
  position: relative;
  overflow: hidden;

  .page-header__media-container {
    position: absolute;
    inset: 0;
    z-index: 0;
  }

  .page-header__image-gradient {
    position: absolute;
    inset: 0;
    z-index: 1;
    width: 1560px;
    height: 800px;
    flex-shrink: 0;
  }

  .page-header__text-container-wrapper {
    position: relative;
    z-index: 2;
    height: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    padding-top: 20rem;
    padding-left: 2rem;
    padding-bottom: 20rem;
  }

  .page-header__text-container {
    justify-content: flex-start;
  }
}
.rectangle {
  background: var(--header-text-alternative, #0B0B26);
  width: 20px;
  height: 1px;
}
</style>
