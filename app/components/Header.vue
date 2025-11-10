<script lang="ts" setup>
import { ref } from "vue";

const { data: headerData, pending: headerPending } = await useContentStack({
	content_type_uid: "navigation",
	language: "en-us",
	trigger404: false,
	key: "header-navigation",
});

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
	<header
		class="sticky top-0 z-50 py-2 backdrop-blur-md bg-gray-900/80 border-b border-gray-800/50 transition-all duration-300">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex items-center justify-between h-14">
				<!-- Logo/Home Link -->
				<div class="flex-shrink-0">
					<NuxtLink
						to="/"
						class="flex items-center text-lg font-semibold text-white transition-opacity hover:opacity-80">
						<ClientOnly>
							<template #fallback>
								<span class="tracking-tight">{{ headerData?.title || "Brand" }}</span>
							</template>
							<span v-if="headerPending" class="flex items-center text-gray-400">
								<svg
									class="animate-spin h-4 w-4 mr-2"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24">
									<circle
										class="opacity-25"
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										stroke-width="4"></circle>
									<path
										class="opacity-75"
										fill="currentColor"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
								</svg>
							</span>
							<span v-else class="tracking-tight">{{ headerData?.title || "Brand" }}</span>
						</ClientOnly>
					</NuxtLink>
				</div>

				<!-- Navigation Menu -->
				<nav
					v-if="!headerPending && headerData?.items && headerData.items.length > 0"
					class="hidden md:flex items-center space-x-1">
					<div
						v-for="(item, index) in headerData.items"
						:key="`nav-${index}`"
						class="relative group"
						v-bind="item.$ && item.$.text">
						<!-- Menu Item with Link -->
						<NuxtLink
							v-if="item.link && item.link.length > 0"
							:to="getLinkUrl(item.link)"
							class="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 relative group">
							{{ item.text }}
							<span
								class="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
						</NuxtLink>
						<!-- Menu Item with Mega Menu -->
						<button
							v-else-if="item.mega_menu && item.mega_menu.length > 0"
							@click="toggleMegaMenu(index)"
							class="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 flex items-center relative group">
							{{ item.text }}
							<svg
								class="ml-1 h-3.5 w-3.5 transition-transform duration-200"
								:class="{ 'rotate-180': activeMegaMenu === `mega-${index}` }"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M19 9l-7 7-7-7" />
							</svg>
							<span
								class="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
						</button>
						<!-- Plain Menu Item -->
						<span v-else class="px-3 py-2 text-sm font-medium text-gray-400 cursor-default">
							{{ item.text }}
						</span>

						<!-- Mega Menu Dropdown -->
						<div
							v-if="activeMegaMenu === `mega-${index}` && item.mega_menu && item.mega_menu.length > 0"
							class="absolute left-0 mt-2 w-72 bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl py-4 z-50 border border-gray-800/50 animate-in fade-in slide-in-from-top-2 duration-200">
							<div class="px-4 py-2 text-sm text-gray-400">
								Mega menu for {{ item.text }} ({{ item.mega_menu.length }} items)
							</div>
						</div>
					</div>
				</nav>

				<!-- Mobile Menu Button / Loading Indicator -->
				<div class="md:hidden">
					<div v-if="headerPending" class="flex items-center text-gray-400">
						<svg
							class="animate-spin h-5 w-5"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24">
							<circle
								class="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								stroke-width="4"></circle>
							<path
								class="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
						</svg>
					</div>
					<button
						v-else
						type="button"
						class="text-gray-300 hover:text-white focus:outline-none transition-colors"
						@click="mobileMenuOpen = !mobileMenuOpen">
						<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
							<path
								v-if="!mobileMenuOpen"
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
							<path v-else stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
			</div>

			<!-- Mobile Menu -->
			<div
				v-if="!headerPending && mobileMenuOpen && headerData?.items && headerData.items.length > 0"
				class="md:hidden border-t border-gray-800/50 py-4 animate-in slide-in-from-top duration-200">
				<nav class="flex flex-col space-y-1">
					<template v-for="(item, index) in headerData.items" :key="`mobile-nav-${index}`">
						<!-- Mobile Menu Item with Link -->
						<NuxtLink
							v-if="item.link && item.link.length > 0"
							:to="getLinkUrl(item.link)"
							class="px-3 py-2.5 text-sm font-medium text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
							@click="mobileMenuOpen = false">
							{{ item.text }}
						</NuxtLink>
						<!-- Mobile Menu Item with Mega Menu -->
						<div v-else-if="item.mega_menu && item.mega_menu.length > 0">
							<button
								@click="toggleMegaMenu(index)"
								class="px-3 py-2.5 text-sm font-medium text-gray-300 hover:bg-gray-800 rounded-lg w-full text-left flex items-center justify-between transition-colors">
								<span>{{ item.text }}</span>
								<svg
									class="h-4 w-4 transition-transform duration-200"
									:class="{ 'rotate-180': activeMegaMenu === `mega-${index}` }"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M19 9l-7 7-7-7" />
								</svg>
							</button>
							<div
								v-if="activeMegaMenu === `mega-${index}`"
								class="pl-4 mt-1 space-y-1 border-l-2 border-gray-700">
								<div class="px-3 py-2 text-xs text-gray-400">
									Mega menu ({{ item.mega_menu.length }} items)
								</div>
							</div>
						</div>
						<!-- Plain Mobile Menu Item -->
						<span v-else class="px-3 py-2.5 text-sm font-medium text-gray-400 cursor-default">
							{{ item.text }}
						</span>
					</template>
				</nav>
			</div>
		</div>
	</header>
</template>
