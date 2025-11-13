import { getContentstackEndpoints, getRegionForString } from "@timbenniks/contentstack-endpoints";
import Sonda from "sonda/nuxt";
const region = getRegionForString(process.env.NUXT_CONTENTSTACK_REGION as string);
const endpoints = getContentstackEndpoints(region, true);

export default defineNuxtConfig({
	compatibilityDate: "2024-04-03",
	devtools: { enabled: true },
	ssr: true,
	modules: [
		"@pinia/nuxt",
		"@nuxtjs/tailwindcss",
		[
			"@nuxt/fonts",
			{
				families: [
					{
						name: "Poppins",
						provider: "google",
						weights: [300, 400, 500, 600, 700],
					},
				],
			},
		],
		"@nuxt/image",
		"@nuxtjs/sitemap",
		[
			"@nuxtjs/robots",
			{
				// Only disallow admin routes, not /api/ to avoid warning
				// API routes are typically not exposed as public routes in Nuxt
				disallow: ["/admin/"],
				allow: ["/"],
			},
		],
		[
			"@nuxtjs/i18n",
			{
				locales: [
					{
						code: "en",
						iso: "en-US",
						name: "English",
						file: "en-us.json",
					},
					{
						code: "es",
						iso: "es-ES",
						name: "Español",
						file: "es-es.json",
					},
					{
						code: "fr",
						iso: "fr-FR",
						name: "Français",
						file: "fr-fr.json",
					},
					{
						code: "de",
						iso: "de-DE",
						name: "Deutsch",
						file: "de-de.json",
					},
				],
				defaultLocale: "en",
				strategy: "prefix_except_default",
				lazy: true,
				langDir: "locales",
				compilation: {
					strictMessage: false,
				},
				detectBrowserLanguage: {
					useCookie: true,
					cookieKey: "i18n_redirected",
					redirectOn: "no prefix",
					alwaysRedirect: false,
					fallbackLocale: "en",
				},
				vueI18n: "./i18n.config.ts",
				baseUrl: process.env.NUXT_PUBLIC_SITE_URL || "https://example.com",
			},
		],
		Sonda({
			server: true,
		}),
		[
			"@nuxtjs/storybook",
			{
				proxy: false,
				// Disable auto-start to prevent conflicts with dev server
				enabled: false,
			},
		],
	],
	site: {
		url: process.env.NUXT_PUBLIC_SITE_URL || "https://example.com",
		name: "ContentStack Integration",
		description: "Modern Nuxt.js application integrated with ContentStack CMS",
		defaultLocale: "en-us",
	},
	app: {
		head: {
			link: [
				{
					rel: "preconnect",
					href: "https://fonts.googleapis.com",
				},
				{
					rel: "preconnect",
					href: "https://fonts.gstatic.com",
					crossorigin: "",
				},
			],
		},
	},
	runtimeConfig: {
		// Certain API endpoints can be set via environment variables for internal testing at Contentstack
		// You can omit in your project. Use @timbenniks/contentstack-endpoints to get the right urls for your region.
		public: {
			siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "https://example.com",
			// Legacy config for old plugin
			apiKey: process.env.NUXT_CONTENTSTACK_API_KEY,
			deliveryToken: process.env.NUXT_CONTENTSTACK_DELIVERY_TOKEN,
			previewToken: process.env.NUXT_CONTENTSTACK_PREVIEW_TOKEN,
			environment: process.env.NUXT_CONTENTSTACK_ENVIRONMENT,
			preview: process.env.NUXT_CONTENTSTACK_PREVIEW === "true",
			region: region ? region : (process.env.NUXT_CONTENTSTACK_REGION as any),
			contentDelivery:
				process.env.NUXT_CONTENTSTACK_CONTENT_DELIVERY ||
				(endpoints && endpoints.contentDelivery),
			previewHost:
				process.env.NUXT_CONTENTSTACK_PREVIEW_HOST || (endpoints && endpoints.preview),
			applicationHost:
				process.env.NUXT_CONTENTSTACK_CONTENT_APPLICATION ||
				(endpoints && endpoints.application),
			// New config for custom utilities
			contentstack: {
				APIKEY: process.env.NUXT_CONTENTSTACK_API_KEY,
				DELIVERYTOKEN: process.env.NUXT_CONTENTSTACK_DELIVERY_TOKEN,
				ENVIRONMENT: process.env.NUXT_CONTENTSTACK_ENVIRONMENT,
			},
		},
	},
});
