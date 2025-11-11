<script lang="ts" setup>
import { ref, computed } from "vue";
import { useContentStackStore } from "@/stores/contentstack";

const { locale } = useI18n();
const contentStackStore = useContentStackStore();

// Fetch header data - useContentStack handles locale reactivity internally
const { data: headerData, pending: headerPending } = await useContentStack({
	content_type_uid: "navigation",
	trigger404: false,
	key: "header-navigation",
});

// Get current language code
const currentLang = computed(() => (locale.value === "en" ? "en-us" : locale.value));

// Get header data from store or fallback to headerData
const currentHeaderData = computed(() => {
	const storeData = contentStackStore.getCachedData("header-navigation", currentLang.value);
	return storeData || headerData.value;
});

// Navigation items computed for cleaner template
const navigationItems = computed(() => {
	if (headerPending.value || !currentHeaderData.value?.items) return [];
	return currentHeaderData.value.items;
});

// Mobile menu state
const mobileMenuOpen = ref(false);
const activeMegaMenu = ref<string | null>(null);

// URL mapping for content types
const CONTENT_TYPE_ROUTES: Record<string, (uid: string) => string> = {
	article_listing_page: () => "/articles",
	landing_page: (uid: string) => `/landing-page/${uid}`,
	article: (uid: string) => `/article/${uid}`,
};

// Get link URL from ContentStack link reference
const getLinkUrl = (link: any): string => {
	if (!link?.length) return "#";
	const firstLink = link[0];
	if (firstLink.external_url) return firstLink.external_url;

	const routeBuilder = CONTENT_TYPE_ROUTES[firstLink._content_type_uid];
	return routeBuilder
		? routeBuilder(firstLink.uid)
		: `/${firstLink._content_type_uid}/${firstLink.uid}`;
};

// Toggle mega menu
const toggleMegaMenu = (index: number) => {
	activeMegaMenu.value = activeMegaMenu.value === `mega-${index}` ? null : `mega-${index}`;
};

// Close mobile menu
const closeMobileMenu = () => {
	mobileMenuOpen.value = false;
};
</script>

<template>
	<header
		class="sticky top-0 z-50 py-2 backdrop-blur-md bg-gray-900/80 border-b border-gray-800/50 transition-all duration-300"
	>
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex items-center justify-between h-14">
				<!-- Logo/Home Link -->
				<div class="flex-shrink-0">
					<NuxtLink
						to="/"
						class="flex items-center text-lg font-semibold text-white transition-opacity hover:opacity-80"
					>
						<span class="tracking-tight flex items-center">
							<svg
								v-if="headerPending"
								class="animate-spin h-4 w-4 mr-2"
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
							{{ currentHeaderData?.title || "Brand" }}
						</span>
					</NuxtLink>
				</div>

				<!-- Navigation Menu -->
				<ClientOnly>
					<nav class="hidden md:flex items-center space-x-1">
						<div
							v-for="(item, index) in navigationItems"
							:key="`nav-${index}`"
							class="relative group"
							v-bind="item.$ && item.$.text"
						>
							<!-- Menu Item with Link -->
							<NuxtLink
								v-if="item.link?.length"
								:to="getLinkUrl(item.link)"
								class="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 relative group"
							>
								{{ item.text }}
								<span
									class="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"
								></span>
							</NuxtLink>
							<!-- Menu Item with Mega Menu -->
							<button
								v-else-if="item.mega_menu?.length"
								@click="toggleMegaMenu(index)"
								class="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 flex items-center relative group"
							>
								{{ item.text }}
								<svg
									class="ml-1 h-3.5 w-3.5 transition-transform duration-200"
									:class="{ 'rotate-180': activeMegaMenu === `mega-${index}` }"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M19 9l-7 7-7-7"
									/>
								</svg>
								<span
									class="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"
								></span>
							</button>
							<!-- Plain Menu Item -->
							<span
								v-else
								class="px-3 py-2 text-sm font-medium text-gray-400 cursor-default"
							>
								{{ item.text }}
							</span>

							<!-- Mega Menu Dropdown -->
							<div
								v-if="activeMegaMenu === `mega-${index}` && item.mega_menu?.length"
								class="absolute left-0 mt-2 w-72 bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl py-4 z-50 border border-gray-800/50 animate-in fade-in slide-in-from-top-2 duration-200"
							>
								<div class="px-4 py-2 text-sm text-gray-400">
									Mega menu for {{ item.text }} ({{ item.mega_menu.length }}
									items)
								</div>
							</div>
						</div>
					</nav>
					<template #fallback>
						<nav class="hidden md:flex items-center space-x-1"></nav>
					</template>
				</ClientOnly>

				<!-- Language Switcher and Mobile Menu Button -->
				<div class="flex items-center space-x-4">
					<LanguageSwitcher />
					<!-- Mobile Menu Button / Loading Indicator -->
					<div class="md:hidden">
						<button
							v-if="!headerPending"
							type="button"
							class="text-gray-300 hover:text-white focus:outline-none transition-colors"
							@click="mobileMenuOpen = !mobileMenuOpen"
						>
							<svg
								class="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								stroke-width="1.5"
							>
								<path
									v-if="!mobileMenuOpen"
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
								/>
								<path
									v-else
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>

			<!-- Mobile Menu -->
			<div
				v-if="!headerPending && mobileMenuOpen && navigationItems.length"
				class="md:hidden border-t border-gray-800/50 py-4 animate-in slide-in-from-top duration-200"
			>
				<nav class="flex flex-col space-y-1">
					<template v-for="(item, index) in navigationItems" :key="`mobile-nav-${index}`">
						<!-- Mobile Menu Item with Link -->
						<NuxtLink
							v-if="item.link?.length"
							:to="getLinkUrl(item.link)"
							class="px-3 py-2.5 text-sm font-medium text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
							@click="closeMobileMenu"
						>
							{{ item.text }}
						</NuxtLink>
						<!-- Mobile Menu Item with Mega Menu -->
						<div v-else-if="item.mega_menu?.length">
							<button
								@click="toggleMegaMenu(index)"
								class="px-3 py-2.5 text-sm font-medium text-gray-300 hover:bg-gray-800 rounded-lg w-full text-left flex items-center justify-between transition-colors"
							>
								<span>{{ item.text }}</span>
								<svg
									class="h-4 w-4 transition-transform duration-200"
									:class="{ 'rotate-180': activeMegaMenu === `mega-${index}` }"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M19 9l-7 7-7-7"
									/>
								</svg>
							</button>
							<div
								v-if="activeMegaMenu === `mega-${index}`"
								class="pl-4 mt-1 space-y-1 border-l-2 border-gray-700"
							>
								<div class="px-3 py-2 text-xs text-gray-400">
									Mega menu ({{ item.mega_menu.length }} items)
								</div>
							</div>
						</div>
						<!-- Plain Mobile Menu Item -->
						<span
							v-else
							class="px-3 py-2.5 text-sm font-medium text-gray-400 cursor-default"
						>
							{{ item.text }}
						</span>
					</template>
				</nav>
			</div>
		</div>
	</header>
</template>
