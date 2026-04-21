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
</script>

<template>
    <header class="header">
        <div class="header__container">
            <figure class="header__logo">
                <img src="/icon.svg" alt="Knowit Experience logo" />
            </figure>

            <div class="header__text">
                <p v-if="headerBlock.Preamble" class="header__preamble">
                    {{ headerBlock.Preamble }}
                </p>

                <div v-if="headerBlock.ImageBlock?.HeadingProp" class="header__Heading">
                    {{ headerBlock.ImageBlock?.HeadingProp }}
                </div>
            </div>
        </div>
    </header>
</template>