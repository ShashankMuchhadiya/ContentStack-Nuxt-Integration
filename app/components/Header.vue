<script lang="ts" setup>
import { ref } from "vue";

const { data: headerData } = await useContentStack({
	content_type_uid: "navigation",
	language: "en-us",
	trigger404: false,
});

const header = headerData?.value;

// Mobile menu state
const mobileMenuOpen = ref(false);
const activeMegaMenu = ref<string | null>(null);

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

// Toggle mega menu
const toggleMegaMenu = (index: number) => {
	if (activeMegaMenu.value === `mega-${index}`) {
		activeMegaMenu.value = null;
	} else {
		activeMegaMenu.value = `mega-${index}`;
	}
};
</script>

<template>
	<header v-if="header" class="bg-white shadow-md sticky top-0 z-50">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex items-center justify-between h-16">
				<!-- Logo/Home Link -->
				<div class="flex-shrink-0">
					<NuxtLink to="/" class="flex items-center text-xl font-bold text-gray-900">
						{{ header.title || "Compass" }}
					</NuxtLink>
				</div>

				<!-- Navigation Menu -->
				<nav v-if="header.items" class="hidden md:flex space-x-1">
					<div
						v-for="(item, index) in header.items"
						:key="`nav-${index}`"
						class="relative group"
						v-bind="item.$ && item.$.text">
						<!-- Menu Item with Link -->
						<NuxtLink
							v-if="item.link && item.link.length > 0"
							:to="getLinkUrl(item.link)"
							class="text-gray-700 hover:text-blue-600 px-4 py-2 text-sm font-medium transition-colors inline-block">
							{{ item.text }}
						</NuxtLink>
						<!-- Menu Item with Mega Menu -->
						<button
							v-else-if="item.mega_menu && item.mega_menu.length > 0"
							@click="toggleMegaMenu(index)"
							class="text-gray-700 hover:text-blue-600 px-4 py-2 text-sm font-medium transition-colors flex items-center">
							{{ item.text }}
							<svg class="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M19 9l-7 7-7-7" />
							</svg>
						</button>
						<!-- Plain Menu Item -->
						<span v-else class="text-gray-700 px-4 py-2 text-sm font-medium">
							{{ item.text }}
						</span>

						<!-- Mega Menu Dropdown (placeholder - can be enhanced later) -->
						<div
							v-if="activeMegaMenu === `mega-${index}` && item.mega_menu && item.mega_menu.length > 0"
							class="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 z-50">
							<div class="px-4 py-2 text-sm text-gray-600">
								Mega menu for {{ item.text }} ({{ item.mega_menu.length }} items)
								<!-- TODO: Fetch and display mega menu content -->
							</div>
						</div>
					</div>
				</nav>

				<!-- Mobile Menu Button -->
				<div class="md:hidden">
					<button
						type="button"
						class="text-gray-700 hover:text-blue-600 focus:outline-none"
						@click="mobileMenuOpen = !mobileMenuOpen">
						<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path
								v-if="!mobileMenuOpen"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 6h16M4 12h16M4 18h16" />
							<path
								v-else
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
			</div>

			<!-- Mobile Menu -->
			<div v-if="mobileMenuOpen && header.items" class="md:hidden border-t border-gray-200 py-4">
				<nav class="flex flex-col space-y-2">
					<template v-for="(item, index) in header.items" :key="`mobile-nav-${index}`">
						<!-- Mobile Menu Item with Link -->
						<NuxtLink
							v-if="item.link && item.link.length > 0"
							:to="getLinkUrl(item.link)"
							class="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
							@click="mobileMenuOpen = false">
							{{ item.text }}
						</NuxtLink>
						<!-- Mobile Menu Item with Mega Menu -->
						<div v-else-if="item.mega_menu && item.mega_menu.length > 0">
							<button
								@click="toggleMegaMenu(index)"
								class="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium w-full text-left flex items-center justify-between">
								<span>{{ item.text }}</span>
								<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M19 9l-7 7-7-7" />
								</svg>
							</button>
							<div
								v-if="activeMegaMenu === `mega-${index}`"
								class="pl-4 mt-2 space-y-2 border-l-2 border-gray-200">
								<div class="text-xs text-gray-500">
									Mega menu ({{ item.mega_menu.length }} items)
									<!-- TODO: Fetch and display mega menu content -->
								</div>
							</div>
						</div>
						<!-- Plain Mobile Menu Item -->
						<span v-else class="text-gray-700 px-3 py-2 text-sm font-medium">
							{{ item.text }}
						</span>
					</template>
				</nav>
			</div>
		</div>
	</header>
</template>
