<script lang="ts" setup>
import VB_EmptyBlockParentClass from "@contentstack/live-preview-utils";

const { data: homepage } = await useContentStack({
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

// Helper function to get link URL
const getLinkUrl = (link: any) => {
	if (!link || !Array.isArray(link) || link.length === 0) return "#";
	const firstLink = link[0];
	if (firstLink.external_url) return firstLink.external_url;
	// For internal links, you might want to resolve them based on content type
	// For now, return a placeholder
	return `/${firstLink._content_type_uid}/${firstLink.uid}`;
};
</script>

<template>
	<main class="min-h-screen">
		<!-- Components Section -->
		<section v-if="homepage?.components" class="relative">
			<div
				v-for="(component, index) in homepage.components"
				:key="`component-${index}`"
				:class="[!homepage?.components || homepage.components.length === 0 ? VB_EmptyBlockParentClass : '']"
				v-bind="homepage?.$ && homepage.$[`components__${index}`]">
				<!-- Card Collection Component -->
				<div v-if="component.card_collection" class="py-16 bg-white">
					<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<!-- Header -->
						<div
							v-if="component.card_collection.header"
							class="text-center mb-12"
							v-bind="component.card_collection.$ && component.card_collection.$.header">
							<h2
								v-if="component.card_collection.header.heading"
								class="text-4xl font-bold mb-4"
								v-bind="
									component.card_collection.header.$ && component.card_collection.header.$.heading
								">
								{{ component.card_collection.header.heading }}
							</h2>
							<p
								v-if="component.card_collection.header.sub_heading"
								class="text-xl text-gray-600"
								v-bind="
									component.card_collection.header.$ && component.card_collection.header.$.sub_heading
								">
								{{ component.card_collection.header.sub_heading }}
							</p>
						</div>

						<!-- Cards Grid -->
						<div
							v-if="component.card_collection.cards"
							class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
							<div
								v-for="(card, cardIndex) in component.card_collection.cards"
								:key="`card-${cardIndex}`"
								class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
								v-bind="
									component.card_collection.$ && component.card_collection.$[`cards__${cardIndex}`]
								">
								<!-- Card Image -->
								<div v-if="card.image" class="relative h-48 overflow-hidden">
									<img
										:src="card.image.url"
										:alt="card.image_alt_text || card.image.title || 'Card image'"
										class="w-full h-full object-cover"
										v-bind="card.image.$ && card.image.$.url" />
								</div>

								<!-- Card Content -->
								<div class="p-6">
									<h3
										v-if="card.title"
										class="text-2xl font-semibold mb-2"
										v-bind="card.$ && card.$.title">
										{{ card.title }}
									</h3>

									<p
										v-if="card.subtitle"
										class="text-lg text-gray-600 mb-3"
										v-bind="card.$ && card.$.subtitle">
										{{ card.subtitle }}
									</p>

									<p
										v-if="card.content"
										class="text-gray-600 mb-4 line-clamp-3"
										v-bind="card.$ && card.$.content">
										{{ card.content }}
									</p>

									<a
										v-if="card.cta"
										:href="getLinkUrl(card.cta.link)"
										class="inline-block text-blue-600 font-semibold hover:text-blue-700"
										v-bind="card.cta.$ && card.cta.$.link">
										{{ card.cta.text }} →
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Teaser Component -->
				<div
					v-if="component.teaser"
					class="py-16"
					:class="[component.teaser.styles?.text_align === 'Left' ? 'bg-gray-50' : 'bg-white']">
					<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div
							class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
							:class="[component.teaser.styles?.text_align === 'Right' ? 'lg:flex-row-reverse' : '']">
							<!-- Text Content -->
							<div
								class="space-y-6"
								:class="[component.teaser.styles?.text_align === 'Right' ? 'lg:order-2' : '']">
								<h2
									v-if="component.teaser.heading"
									class="text-4xl font-bold"
									v-bind="component.teaser.$ && component.teaser.$.heading">
									{{ component.teaser.heading }}
								</h2>

								<div
									v-if="component.teaser.content"
									class="text-lg text-gray-600 prose max-w-none"
									v-html="component.teaser.content"
									v-bind="component.teaser.$ && component.teaser.$.content" />

								<!-- CTA Buttons -->
								<div v-if="component.teaser.cta" class="flex flex-wrap gap-4 pt-4">
									<a
										v-for="(ctaItem, ctaIndex) in component.teaser.cta"
										:key="`cta-${ctaIndex}`"
										:href="getLinkUrl(ctaItem.link) || ctaItem.external_url || '#'"
										class="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
										v-bind="ctaItem.$ && ctaItem.$.link">
										{{ ctaItem.text }}
									</a>
								</div>
							</div>

							<!-- Image/Video -->
							<div :class="[component.teaser.styles?.text_align === 'Right' ? 'lg:order-1' : '']">
								<!-- Image -->
								<div v-if="component.teaser.image && component.teaser.image.length > 0">
									<img
										v-for="(imgItem, imgIndex) in component.teaser.image"
										:key="`img-${imgIndex}`"
										:src="imgItem.image?.url"
										:alt="imgItem.image_alt_text || imgItem.image?.title || 'Teaser image'"
										class="rounded-lg shadow-xl w-full"
										v-bind="imgItem.image?.$ && imgItem.image.$.url" />
								</div>

								<!-- Video -->
								<div
									v-if="
										component.teaser.video &&
										component.teaser.video.video &&
										component.teaser.video.video.url
									">
									<video
										:src="component.teaser.video.video.url"
										:alt="component.teaser.video.video_alt_text"
										controls
										class="rounded-lg shadow-xl w-full"
										v-bind="component.teaser.video.video.$ && component.teaser.video.video.$.url" />
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Text and Image Carousel Component -->
				<div v-if="component.text_and_image_carousel" class="py-16 bg-gray-50">
					<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<!-- Carousel Container -->
						<div class="relative">
							<!-- Carousel Items -->
							<div v-if="component.text_and_image_carousel.carousel_items" class="space-y-12">
								<div
									v-for="(item, itemIndex) in component.text_and_image_carousel.carousel_items"
									:key="`carousel-item-${itemIndex}`"
									class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
									:class="[
										component.text_and_image_carousel.styles?.image_position === 'left'
											? 'lg:flex-row'
											: 'lg:flex-row-reverse',
									]">
									<!-- Image -->
									<div
										:class="[
											component.text_and_image_carousel.styles?.image_position === 'left'
												? 'lg:order-1'
												: 'lg:order-2',
										]">
										<img
											v-if="item.image"
											:src="item.image.url"
											:alt="item.image_alt_text || item.image.title || 'Carousel image'"
											class="rounded-lg shadow-xl w-full"
											v-bind="item.image.$ && item.image.$.url" />
									</div>

									<!-- Content -->
									<div
										:class="[
											component.text_and_image_carousel.styles?.image_position === 'left'
												? 'lg:order-2'
												: 'lg:order-1',
											item.styles?.theme === 'light' ? 'text-gray-800' : 'text-white',
										]">
										<h3
											v-if="item.heading"
											class="text-3xl font-bold mb-4"
											v-bind="item.$ && item.$.heading">
											{{ item.heading }}
										</h3>

										<div
											v-if="item.content"
											class="text-lg mb-6 prose max-w-none whitespace-pre-line"
											v-html="item.content"
											v-bind="item.$ && item.$.content" />

										<!-- CTA Buttons -->
										<div v-if="item.cta" class="flex flex-wrap gap-4">
											<a
												v-for="(ctaItem, ctaIndex) in item.cta"
												:key="`cta-${ctaIndex}`"
												:href="getLinkUrl(ctaItem.link) || ctaItem.external_url || '#'"
												class="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
												v-bind="ctaItem.$ && ctaItem.$.link">
												{{ ctaItem.text }}
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Featured Articles Section -->
		<section v-if="homepage?.featured_articles" class="py-16 bg-white">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div
					class="text-center mb-12"
					v-bind="homepage.featured_articles.$ && homepage.featured_articles.$.heading">
					<h2 v-if="homepage.featured_articles.heading" class="text-4xl font-bold mb-4">
						{{ homepage.featured_articles.heading }}
					</h2>
					<p v-if="homepage.featured_articles.sub_heading" class="text-xl text-gray-600">
						{{ homepage.featured_articles.sub_heading }}
					</p>
				</div>

				<!-- Articles Grid -->
				<div
					v-if="homepage.featured_articles.articles"
					class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					<div
						v-for="(article, articleIndex) in homepage.featured_articles.articles"
						:key="`article-${articleIndex}`"
						class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
						<!-- Article content will be resolved from the article reference -->
						<div class="p-6">
							<p class="text-gray-600">Article: {{ article.uid }} ({{ article._content_type_uid }})</p>
							<a
								:href="`/article/${article.uid}`"
								class="text-blue-600 font-semibold hover:text-blue-700 mt-2 inline-block">
								Read More →
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Empty state when no data -->
		<div v-if="!homepage" class="flex items-center justify-center min-h-screen">
			<div class="text-center">
				<h1 class="text-4xl font-bold text-gray-800 mb-4">Welcome</h1>
				<p class="text-gray-600">Homepage data is loading...</p>
			</div>
		</div>
	</main>
</template>
