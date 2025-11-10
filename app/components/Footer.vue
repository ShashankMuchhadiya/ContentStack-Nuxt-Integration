<script lang="ts" setup>
import VB_EmptyBlockParentClass from "@contentstack/live-preview-utils";

// Fetch footer data from Contentstack
const { data: footerData, pending: footerPending } = await useContentStack({
	content_type_uid: "menu",
	language: "en-us",
	trigger404: false,
	key: "footer-menu",
});

// Helper function to get link URL
const getLinkUrl = (link: any) => {
	if (!link || !Array.isArray(link) || link.length === 0) return "#";
	const firstLink = link[0];
	if (firstLink.external_url) return firstLink.external_url;
	// Build URL based on content type
	if (firstLink._content_type_uid === "article_listing_page") {
		return `/articles`;
	} else if (firstLink._content_type_uid === "landing_page") {
		return `/landing-page/${firstLink.uid}`;
	} else if (firstLink._content_type_uid === "article") {
		return `/article/${firstLink.uid}`;
	}
	return `/${firstLink._content_type_uid}/${firstLink.uid}`;
};

// Helper function to render rich text (simplified - can be enhanced)
const renderRichText = (richText: any) => {
	if (!richText || !richText.children) return "";

	const renderNode = (node: any): string => {
		if (node.text) {
			let text = node.text;
			if (node.bold) text = `<strong>${text}</strong>`;
			if (node.underline) text = `<u>${text}</u>`;
			return text;
		}

		if (node.type === "a" && node.attrs) {
			const href = node.attrs.url || "#";
			const target = node.attrs.target || "_self";
			const children = node.children ? node.children.map(renderNode).join("") : "";
			return `<a href="${href}" target="${target}" class="underline hover:text-white">${children}</a>`;
		}

		if (node.type === "p") {
			const children = node.children ? node.children.map(renderNode).join("") : "";
			return `<p>${children}</p>`;
		}

		if (node.children) {
			return node.children.map(renderNode).join("");
		}

		return "";
	};

	return richText.children.map(renderNode).join("");
};
</script>

<template>
	<footer class="bg-gray-950 border-t border-gray-800/50">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
			<!-- Loading State -->
			<div v-if="footerPending" class="flex items-center justify-center py-12">
				<svg
					class="animate-spin h-6 w-6 text-gray-400"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24">
					<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
					<path
						class="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
				</svg>
			</div>

			<!-- Footer Content -->
			<div
				v-else-if="footerData?.sections && footerData.sections.length > 0"
				class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-12">
				<!-- Footer Sections -->
				<div
					v-for="(section, sectionIndex) in footerData.sections"
					:key="`footer-section-${sectionIndex}`"
					class="col-span-1">
					<h3
						v-if="section.title"
						class="text-sm font-semibold text-white mb-4 tracking-tight"
						v-bind="section.$ && section.$.title">
						{{ section.title }}
					</h3>

					<!-- Section Link (if exists) -->
					<NuxtLink
						v-if="section.link && section.link.length > 0"
						:to="getLinkUrl(section.link)"
						class="text-gray-400 hover:text-white text-sm transition-colors block mb-4">
						View All
					</NuxtLink>

					<!-- Section Links -->
					<ul v-if="section.links" class="space-y-2.5">
						<li v-for="(link, linkIndex) in section.links" :key="`link-${linkIndex}`">
							<a
								:href="link.external_link || getLinkUrl(link.link)"
								:target="link.external_link ? '_blank' : '_self'"
								class="text-sm text-gray-400 hover:text-white transition-colors duration-200 inline-block"
								v-bind="link.$ && link.$.text">
								{{ link.text }}
							</a>
						</li>
					</ul>
				</div>
			</div>

			<!-- Built By Section -->
			<div
				v-if="!footerPending && footerData?.built_by"
				class="mt-12 pt-8 border-t border-gray-800/50 text-center text-xs text-gray-500"
				v-bind="footerData.$ && footerData.$.built_by"
				v-html="renderRichText(footerData.built_by)" />

			<!-- Copyright Info -->
			<div
				v-if="!footerPending && footerData?.copyright_info"
				class="mt-4 text-center text-xs text-gray-500"
				v-bind="footerData.$ && footerData.$.copyright_info"
				v-html="renderRichText(footerData.copyright_info)" />
		</div>
	</footer>
</template>
