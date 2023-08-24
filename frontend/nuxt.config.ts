// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['normalize.css', '@/assets/fonts.scss'],
  modules: [
    '@nuxtjs/i18n',
  ],
  i18n: {
    locales: [
      { code: 'en', file: './i18n/en.ts' }
    ],
    defaultLocale: 'en',
    strategy: 'no_prefix'
  },
  app: {
    head: {
      script: [
        process.env.UMAMI_SCRIPT && process.env.UMAMI_ID ? { src: process.env.UMAMI_SCRIPT, async: true, 'data-website-id': process.env.UMAMI_ID } : undefined
      ]
    }
  }  
})
