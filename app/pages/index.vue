<script lang="ts" setup>
import VB_EmptyBlockParentClass from "@contentstack/live-preview-utils";

const { data: homepage, pending: homepagePending } = await useContentStack({
	content_type_uid: "home_page",
	trigger404: false,
});

// Set SEO metadata
if (homepage?.value) {
	const seoData = homepage.value.seo;
	const config = useRuntimeConfig();
	const siteUrl =
		config.public.siteUrl || process.env.NUXT_PUBLIC_SITE_URL || "https://example.com";

	useSEO({
		title: seoData?.title || homepage.value.title || "Home",
		description:
			seoData?.description ||
			homepage.value.description ||
			"Welcome to our ContentStack-powered website",
		image: homepage.value.image?.url || `${siteUrl}/og-image.jpg`,
		url: `${siteUrl}/`,
		canonical: seoData?.canonical_url || `${siteUrl}/`,
		noIndex: seoData?.no_index || false,
		type: "website",
	});
}
</script>

<template>
	<main class="min-h-screen">
		<ClientOnly>
			<div v-if="homepagePending" class="flex items-center justify-center min-h-[60vh]">
				<div class="text-center">
					<svg
						class="animate-spin h-10 w-10 mx-auto text-gray-400 mb-4"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle
							class="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							stroke-width="4"
						></circle>
						<path
							class="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						></path>
					</svg>
					<p class="text-sm text-gray-400">Loading content...</p>
				</div>
			</div>

			<template v-else>
				<section v-if="homepage?.components" class="relative">
					<div
						v-for="(component, index) in homepage.components"
						:key="`component-${index}`"
						:class="[
							!homepage?.components || homepage.components.length === 0
								? VB_EmptyBlockParentClass
								: '',
						]"
						v-bind="homepage?.$ && homepage?.$[`components__${index}`]"
					>
						<!-- Card Collection Component -->
						<CardCollection
							v-if="component.card_collection"
							:card-collection="component.card_collection"
							:index="index"
							:parent-data="homepage"
						/>

						<!-- Teaser Component -->
						<Teaser v-if="component.teaser" :teaser="component.teaser" />

						<!-- Text and Image Carousel Component -->
						<TextImageCarousel
							v-if="component.text_and_image_carousel"
							:carousel="component.text_and_image_carousel"
						/>
					</div>
				</section>

				<!-- Featured Articles Section -->
				<FeaturedArticles
					v-if="homepage?.featured_articles"
					:featured-articles="homepage.featured_articles"
				/>

				<!-- Empty state when no data -->
				<EmptyState v-if="!homepage" title="Welcome" message="No homepage data available" />
			</template>
			<template #fallback>
				<div class="flex items-center justify-center min-h-[60vh]">
					<div class="text-center">
						<svg
							class="animate-spin h-10 w-10 mx-auto text-gray-400 mb-4"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
						>
							<circle
								class="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								stroke-width="4"
							></circle>
							<path
								class="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							></path>
						</svg>
						<p class="text-sm text-gray-400">Loading content...</p>
					</div>
				</div>
			</template>
		</ClientOnly>
	</main>
</template>
