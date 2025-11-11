import { defineConfig } from 'vitepress';

export default defineConfig({
	title: "ContentStack Integration",
	description: "Documentation for Nuxt ContentStack Integration",
	base: "/",
	
	themeConfig: {
		nav: [
			{ text: "Home", link: "/" },
			{ text: "Getting Started", link: "/getting-started" },
			{ text: "Components", link: "/components/" },
			{ text: "Composables", link: "/composables/" },
			{ text: "API Reference", link: "/api/" },
		],
		
		sidebar: {
			"/": [
				{
					text: "Introduction",
					items: [
						{ text: "What is this?", link: "/" },
						{ text: "Getting Started", link: "/getting-started" },
					],
				},
				{
					text: "Components",
					items: [
						{ text: "Overview", link: "/components/" },
						{ text: "Header", link: "/components/header" },
						{ text: "Footer", link: "/components/footer" },
						{ text: "CardCollection", link: "/components/card-collection" },
						{ text: "Teaser", link: "/components/teaser" },
						{ text: "TextImageCarousel", link: "/components/text-image-carousel" },
						{ text: "FeaturedArticles", link: "/components/featured-articles" },
						{ text: "LanguageSwitcher", link: "/components/language-switcher" },
						{ text: "PageLoader", link: "/components/page-loader" },
						{ text: "EmptyState", link: "/components/empty-state" },
					],
				},
				{
					text: "Composables",
					items: [
						{ text: "Overview", link: "/composables/" },
						{ text: "useContentStack", link: "/composables/use-content-stack" },
						{ text: "useSEO", link: "/composables/use-seo" },
					],
				},
				{
					text: "API Reference",
					items: [
						{ text: "Overview", link: "/api/" },
						{ text: "ContentStack SDK", link: "/api/contentstack-sdk" },
						{ text: "Utilities", link: "/api/utilities" },
					],
				},
				{
					text: "Guides",
					items: [
						{ text: "Configuration", link: "/guides/configuration" },
						{ text: "ContentStack Setup", link: "/guides/contentstack-setup" },
						{ text: "Internationalization", link: "/guides/internationalization" },
						{ text: "SEO", link: "/guides/seo" },
					],
				},
			],
		},
		
		socialLinks: [
			{
				icon: "github",
				link: "https://github.com/ShashankMuchhadiya/ContentStack-Nuxt-Integration",
			},
		],
		
		footer: {
			message: "Released under the MIT License.",
			copyright: "Copyright © 2024 Shashank Muchhadiya",
		},
		
		search: {
			provider: "local",
		},
	},
});

