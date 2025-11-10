<script lang="ts" setup>
import VB_EmptyBlockParentClass from "@contentstack/live-preview-utils";

const route = useRoute();
const url = "/" + (Array.isArray(route.params.slug) ? route.params.slug.join("/") : route.params.slug || "");

const { data: pageData, pending: pagePending } = await useContentStack({
	content_type_uid: "page",
	language: "en-us",
	url: url,
});

const page = pageData;

// Set SEO metadata
if (page) {
	useHead({
		title: page.value?.title,
		meta: [{ name: "description", content: page.value?.description || "" }],
	});
}
</script>

<template>
	<main class="max-w-screen-md mx-auto">
		<!-- Loading State -->
		<div v-if="pagePending" class="flex items-center justify-center min-h-[60vh]">
			<div class="text-center">
				<svg
					class="animate-spin h-10 w-10 mx-auto text-gray-400 mb-4"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24">
					<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
					<path
						class="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
				</svg>
				<p class="text-sm text-gray-400">Loading content...</p>
			</div>
		</div>

		<!-- Page Content -->
		<section v-else class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
			<h1
				v-if="page?.title"
				class="text-4xl lg:text-5xl font-semibold mb-6 tracking-tight text-white"
				v-bind="page?.$ && page?.$.title">
				{{ page?.title }}
			</h1>

			<p
				v-if="page?.description"
				class="mb-8 text-xl text-gray-400 leading-relaxed"
				v-bind="page?.$ && page?.$.description">
				{{ page?.description }}
			</p>

			<NuxtImg
				v-if="page?.image"
				:src="page?.image.url"
				:alt="page?.image.title"
				class="mb-12 rounded-2xl shadow-2xl w-full"
				width="768"
				height="414"
				loading="lazy"
				v-bind="page?.image?.$ && page?.image?.$.url" />

			<div
				v-if="page?.rich_text"
				class="prose prose-lg prose-invert max-w-none mb-12"
				v-bind="page?.$ && page?.$.rich_text"
				v-html="page?.rich_text" />

			<div
				:class="[
					'space-y-8 max-w-full mt-4',
					!page?.blocks || page.blocks.length === 0 ? VB_EmptyBlockParentClass : '',
				]"
				v-bind="page?.$ && page?.$.blocks">
				<div
					v-for="(item, index) in page?.blocks"
					:key="item.block._metadata.uid"
					v-bind="page?.$ && page?.$[`blocks__${index}`]"
					:class="[
						'flex flex-col md:flex-row items-center space-y-4 md:space-y-0 bg-white',
						item.block.layout === 'image_left' ? 'md:flex-row' : 'md:flex-row-reverse',
					]">
					<div class="w-full md:w-1/2">
						<NuxtImg
							v-if="item.block.image"
							:src="item.block.image.url"
							:alt="item.block.image.title"
							width="200"
							height="112"
							class="w-full"
							loading="lazy"
							v-bind="item.block.$ && item.block.$.image" />
					</div>
					<div class="w-full md:w-1/2 p-4">
						<h2
							v-if="item.block.title"
							class="text-2xl font-bold"
							v-bind="item.block.$ && item.block.$.title">
							{{ item.block.title }}
						</h2>
						<div
							v-if="item.block.copy"
							v-html="item.block.copy"
							class="prose"
							v-bind="item.block.$ && item.block.$.copy" />
					</div>
				</div>
			</div>
		</section>
	</main>
</template>
