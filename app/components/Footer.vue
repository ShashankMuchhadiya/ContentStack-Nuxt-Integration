<script lang="ts" setup>
import VB_EmptyBlockParentClass from "@contentstack/live-preview-utils";
import getLinkUrl from "@/utils/getLinkUrl";
import { watch, nextTick, computed } from "vue";
import { useContentStackStore } from "@/stores/contentstack";

const { locale } = useI18n();
const contentStackStore = useContentStackStore();

// Fetch footer data from Contentstack
const {
	data: footerData,
	pending: footerPending,
	refresh: refreshFooter,
} = await useContentStack({
	content_type_uid: "menu",
	trigger404: false,
	key: "footer-menu",
});

// Create a computed property that ensures data is reactive to locale changes
const currentFooterData = computed(() => {
	// Get the language code
	const lang = locale.value === "en" ? "en-us" : locale.value;

	// Get data from Pinia store first (most up-to-date)
	// Use base key consistently
	const storeData = contentStackStore.getCachedData("footer-menu", lang);

	// Fallback to footerData if store doesn't have it
	// Always return footerData.value to ensure reactivity
	return storeData || footerData.value || null;
});

// Watch for locale changes and ensure data is updated
watch(
	locale,
	async (newLocale, oldLocale) => {
		// Always update when locale changes, even if oldLocale is undefined (initial load)
		if (newLocale !== oldLocale) {
			// Get the language codes
			const oldLang = oldLocale === "en" ? "en-us" : oldLocale || "en-us";
			const newLang = newLocale === "en" ? "en-us" : newLocale;

			// Check if we have cached data in Pinia store
			const cachedData = contentStackStore.getCachedData("footer-menu", newLang);

			if (cachedData) {
				// Use cached data - update footerData directly
				footerData.value = JSON.parse(JSON.stringify(cachedData)); // Deep clone to force reactivity
				// Wait for next tick to ensure reactivity
				await nextTick();
			} else {
				// No cached data - fetch from API
				// Clear Nuxt cache to force fresh fetch
				if (oldLang) {
					clearNuxtData(`footer-menu-${oldLang}`);
				}
				clearNuxtData(`footer-menu-${newLang}`);

				// Refresh footer data
				await refreshFooter();

				// Wait for next tick
				await nextTick();

				// Force reactivity update - ensure data is properly set
				if (footerData.value) {
					footerData.value = JSON.parse(JSON.stringify(footerData.value));
				}
			}
		}
	},
	{ immediate: true }
);

// Watch currentFooterData to sync with footerData - this ensures data is always in sync
watch(
	currentFooterData,
	newData => {
		if (newData) {
			// Always update footerData when currentFooterData changes
			// Use deep comparison to avoid unnecessary updates
			if (JSON.stringify(newData) !== JSON.stringify(footerData.value)) {
				footerData.value = JSON.parse(JSON.stringify(newData));
			}
		}
	},
	{ immediate: true, deep: true }
);

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
			<ClientOnly>
				<div v-if="footerPending" class="flex items-center justify-center py-12">
					<svg
						class="animate-spin h-6 w-6 text-gray-400"
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
				</div>

				<template v-else>
					<div
						v-if="currentFooterData?.sections && currentFooterData.sections.length > 0"
						class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-12"
					>
						<!-- Footer Sections -->
						<div
							v-for="(section, sectionIndex) in currentFooterData.sections"
							:key="`footer-section-${sectionIndex}`"
							class="col-span-1"
						>
							<h3
								v-if="section.title"
								class="text-sm font-semibold text-white mb-4 tracking-tight"
								v-bind="section.$ && section.$.title"
							>
								{{ section.title }}
							</h3>

							<!-- Section Link (if exists) -->
							<NuxtLink
								v-if="section.link && section.link.length > 0"
								:to="getLinkUrl(section.link)"
								class="text-gray-400 hover:text-white text-sm transition-colors block mb-4"
							>
								View All
							</NuxtLink>

							<!-- Section Links -->
							<ul v-if="section.links" class="space-y-2.5">
								<li
									v-for="(link, linkIndex) in section.links"
									:key="`link-${linkIndex}`"
								>
									<a
										:href="link.external_link || getLinkUrl(link.link)"
										:target="link.external_link ? '_blank' : '_self'"
										class="text-sm text-gray-400 hover:text-white transition-colors duration-200 inline-block"
										v-bind="link.$ && link.$.text"
									>
										{{ link.text }}
									</a>
								</li>
							</ul>
						</div>
					</div>

					<!-- Built By Section -->
					<div
						v-if="currentFooterData?.built_by"
						class="mt-12 pt-8 border-t border-gray-800/50 text-center text-xs text-gray-500"
						v-bind="currentFooterData.$ && currentFooterData.$.built_by"
						v-html="renderRichText(currentFooterData.built_by)"
					/>

					<!-- Copyright Info -->
					<div
						v-if="currentFooterData?.copyright_info"
						class="mt-4 text-center text-xs text-gray-500"
						v-bind="currentFooterData.$ && currentFooterData.$.copyright_info"
						v-html="renderRichText(currentFooterData.copyright_info)"
					/>
				</template>
				<template #fallback>
					<div class="flex items-center justify-center py-12">
						<svg
							class="animate-spin h-6 w-6 text-gray-400"
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
					</div>
				</template>
			</ClientOnly>
		</div>
	</footer>
</template>
