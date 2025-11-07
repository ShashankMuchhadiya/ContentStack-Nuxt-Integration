<script lang="ts" setup>
import VB_EmptyBlockParentClass from "@contentstack/live-preview-utils";

// Fetch footer data from Contentstack
const { data: footerData } = await useContentStack({
	content_type_uid: "menu",
	language: "en-us",
	trigger404: false,
});

const footer = footerData?.value;

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
	<footer v-if="footer" class="bg-gray-900 text-white">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
				<!-- Footer Sections -->
				<div
					v-for="(section, sectionIndex) in footer.sections"
					:key="`footer-section-${sectionIndex}`"
					class="col-span-1">
					<h3 v-if="section.title" class="text-lg font-semibold mb-4" v-bind="section.$ && section.$.title">
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
					<ul v-if="section.links" class="space-y-2">
						<li v-for="(link, linkIndex) in section.links" :key="`link-${linkIndex}`">
							<a
								:href="link.external_link || getLinkUrl(link.link)"
								:target="link.external_link ? '_blank' : '_self'"
								class="text-gray-400 hover:text-white text-sm transition-colors"
								v-bind="link.$ && link.$.text">
								{{ link.text }}
							</a>
						</li>
					</ul>
				</div>
			</div>

			<!-- Built By Section -->
			<div
				v-if="footer.built_by"
				class="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400"
				v-bind="footer.$ && footer.$.built_by"
				v-html="renderRichText(footer.built_by)" />

			<!-- Copyright Info -->
			<div
				v-if="footer.copyright_info"
				class="mt-4 text-center text-sm text-gray-400"
				v-bind="footer.$ && footer.$.copyright_info"
				v-html="renderRichText(footer.copyright_info)" />
		</div>
	</footer>
</template>
