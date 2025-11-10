<script lang="ts" setup>
// Default SEO for the entire site
const config = useRuntimeConfig();
const siteUrl = config.public.siteUrl || process.env.NUXT_PUBLIC_SITE_URL || "https://example.com";

useHead({
	htmlAttrs: {
		lang: "en",
	},
	meta: [
		{ charset: "utf-8" },
		{ name: "viewport", content: "width=device-width, initial-scale=1" },
		{ name: "format-detection", content: "telephone=no" },
		{ name: "theme-color", content: "#111827" },
	],
	link: [
		{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
		{ rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
	],
});
</script>

<template>
	<div class="min-h-screen flex flex-col bg-gray-950 text-gray-100 antialiased">
		<Header />
		<main class="flex-grow">
			<NuxtPage />
		</main>
		<Footer />
	</div>
</template>

<style>
	* {
		font-family: "Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif;
	}
</style>
