<script lang="ts" setup>
const { data: pageData, pending: pagePending } = await useContentStack({
	content_type_uid: "page",
	url: "/about-us",
	trigger404: false,
});

const page = pageData;

// Set SEO metadata
if (page?.value) {
	const config = useRuntimeConfig();
	const siteUrl =
		config.public.siteUrl || process.env.NUXT_PUBLIC_SITE_URL || "https://example.com";

	useSEO({
		// Try to fetch from ContentStack first
		title: page.value?.title || "About Us",
		description: page.value?.description || "Learn more about our company and mission",
		image: page.value?.image?.url || `${siteUrl}/og-image.jpg`,
		url: `${siteUrl}/about-us`,
		canonical: `${siteUrl}/about-us`,
		noIndex: false,
		type: "website",
	});
} else {
	const config = useRuntimeConfig();
	const siteUrl =
		config.public.siteUrl || process.env.NUXT_PUBLIC_SITE_URL || "https://example.com";

	useSEO({
		title: "About Us",
		description: "Learn more about our company and mission",
		url: `${siteUrl}/about-us`,
		canonical: `${siteUrl}/about-us`,
		type: "website",
	});
}
</script>

<template>
	<main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
		<!-- Loading State -->
		<ClientOnly>
			<PageLoader v-if="pagePending" />
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

		<!-- Content from ContentStack -->
		<section v-if="!pagePending && page?.value" class="space-y-8">
			<h1
				class="text-4xl lg:text-5xl font-semibold mb-6 tracking-tight text-white"
				v-bind="page.value?.$ && page.value.$.title"
			>
				{{ page.value?.title }}
			</h1>

			<p
				v-if="page.value?.description"
				class="mb-8 text-xl text-gray-400 leading-relaxed"
				v-bind="page.value?.$ && page.value.$.description"
			>
				{{ page.value?.description }}
			</p>

			<NuxtImg
				v-if="page.value?.image"
				:src="page.value.image.url"
				:alt="page.value.image.title || 'About Us'"
				class="mb-12 rounded-2xl shadow-2xl w-full"
				width="768"
				height="414"
				loading="lazy"
				v-bind="page.value.image?.$ && page.value.image.$.url"
			/>

			<div
				v-if="page.value?.rich_text"
				class="prose prose-lg prose-invert max-w-none mb-12"
				v-bind="page.value?.$ && page.value.$.rich_text"
				v-html="page.value.rich_text"
			/>

			<div
				v-if="page.value?.blocks && page.value.blocks.length > 0"
				:class="['space-y-8 max-w-full mt-4']"
				v-bind="page.value?.$ && page.value.$.blocks"
			>
				<div
					v-for="(item, index) in page.value.blocks"
					:key="item.block._metadata.uid"
					v-bind="page.value?.$ && page.value.$[`blocks__${index}`]"
					:class="[
						'flex flex-col md:flex-row items-center space-y-4 md:space-y-0',
						item.block.layout === 'image_left' ? 'md:flex-row' : 'md:flex-row-reverse',
					]"
				>
					<div class="w-full md:w-1/2">
						<NuxtImg
							v-if="item.block.image"
							:src="item.block.image.url"
							:alt="item.block.image.title || 'Block image'"
							width="200"
							height="112"
							class="w-full rounded-lg"
							loading="lazy"
							v-bind="item.block.$ && item.block.$.image"
						/>
					</div>
					<div class="w-full md:w-1/2 p-4">
						<h2
							v-if="item.block.title"
							class="text-2xl font-bold text-white mb-4"
							v-bind="item.block.$ && item.block.$.title"
						>
							{{ item.block.title }}
						</h2>
						<div
							v-if="item.block.copy"
							v-html="item.block.copy"
							class="prose prose-invert text-gray-300"
							v-bind="item.block.$ && item.block.$.copy"
						/>
					</div>
				</div>
			</div>
		</section>

		<!-- Default Content if no ContentStack data -->
		<section v-else class="space-y-8">
			<h1 class="text-4xl lg:text-5xl font-semibold mb-6 tracking-tight text-white">
				About Us
			</h1>
			<p class="text-xl text-gray-400 leading-relaxed mb-8">
				Welcome to our company. We are dedicated to providing exceptional services and
				creating value for our customers.
			</p>
			<div class="prose prose-lg prose-invert max-w-none text-gray-300">
				<p>
					This page content can be managed through ContentStack. Create a page entry with
					the URL "/about-us" to display custom content here.
				</p>
			</div>
		</section>
	</main>
</template>
