// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  nitro: {
		openAPI: {
			meta: {
				title: "Altura Translation Keys Viewer",
				description: "This application gives you a comprehensive overview of all translation keys used in the Altura project.",
				version: "1.0",
			},
		},
	},
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui',
    '@pinia/nuxt',
  ]
})