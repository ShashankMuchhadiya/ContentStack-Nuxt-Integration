<script lang="ts" setup>
import VB_EmptyBlockParentClass from "@contentstack/live-preview-utils";

const { data: homepage, pending: homepagePending } = await useContentStack({
	content_type_uid: "home_page",
	language: "en-us",
	trigger404: false,
});

// Set SEO metadata
if (homepage?.value?.seo) {
	useHead({
		title: homepage.value.seo.title || homepage.value.title,
		meta: [
			{ name: "description", content: homepage.value.seo.description || "" },
			{ name: "robots", content: homepage.value.seo.no_index ? "noindex,nofollow" : "index,follow" },
		],
		link: homepage.value.seo.canonical_url ? [{ rel: "canonical", href: homepage.value.seo.canonical_url }] : [],
	});
}
</script>

<template>
	<main class="min-h-screen">
		<!-- Loading State -->
		<PageLoader v-if="homepagePending" />

		<!-- Components Section -->
		<section v-else-if="homepage?.components" class="relative">
			<div
				v-for="(component, index) in homepage.components"
				:key="`component-${index}`"
				:class="[!homepage?.components || homepage.components.length === 0 ? VB_EmptyBlockParentClass : '']"
				v-bind="homepage?.$ && homepage?.$[`components__${index}`]">
				<!-- Card Collection Component -->
				<CardCollection
					v-if="component.card_collection"
					:card-collection="component.card_collection"
					:index="index"
					:parent-data="homepage" />

				<!-- Teaser Component -->
				<Teaser v-if="component.teaser" :teaser="component.teaser" />

				<!-- Text and Image Carousel Component -->
				<TextImageCarousel
					v-if="component.text_and_image_carousel"
					:carousel="component.text_and_image_carousel" />
			</div>
		</section>

		<!-- Featured Articles Section -->
		<FeaturedArticles v-if="homepage?.featured_articles" :featured-articles="homepage.featured_articles" />

		<!-- Empty state when no data -->
		<EmptyState v-else-if="!homepage" title="Welcome" message="No homepage data available" />
	</main>
</template>
