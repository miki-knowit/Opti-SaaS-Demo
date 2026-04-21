import { fileURLToPath } from 'node:url';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    alias: {
        '@features': fileURLToPath(new URL('./app/assets/scss/Features', import.meta.url)),
        '@scssRoot': fileURLToPath(new URL('./app/assets', import.meta.url)),
        '@scss': fileURLToPath(new URL('./app/assets/scss', import.meta.url)),
    },
    components: [
        {
            path: '~/components',
            pathPrefix: false,
        },
    ],
    css: ['~/assets/main.scss'],
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    vite: {
        optimizeDeps: {
            include: ['@vue/devtools-core', '@vue/devtools-kit'],
        },
    },
    runtimeConfig: {
        optimizelyGraphUrl: process.env.OPTIMIZELY_GRAPH_URL || '',
    },
});
