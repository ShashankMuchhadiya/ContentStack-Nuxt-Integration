<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue";

const { locale, locales, setLocale } = useI18n();
const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const currentLocale = computed(() => {
	return locales.value.find((l: any) => l.code === locale.value);
});

const switchLanguage = async (localeCode: string) => {
	const route = useRoute();
	const router = useRouter();
	
	// Set the locale
	await setLocale(localeCode);
	
	// Navigate to the new locale route
	// For default locale (en), use root path, otherwise use locale prefix
	let newPath: string;
	
	// Get the current path without locale prefix
	const currentPath = route.path.replace(/^\/(es|fr|de)/, "") || "/";
	
	if (localeCode === "en") {
		// Default locale - use path without prefix
		newPath = currentPath;
	} else {
		// Non-default locale - add locale prefix
		if (currentPath === "/") {
			newPath = `/${localeCode}`;
		} else {
			newPath = `/${localeCode}${currentPath}`;
		}
	}
	
	// Only navigate if path changed
	if (newPath !== route.path) {
		await router.push(newPath);
	}
	
	isOpen.value = false;
};

// Close dropdown when clicking outside
const handleClickOutside = (event: MouseEvent) => {
	if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
		isOpen.value = false;
	}
};

onMounted(() => {
	if (import.meta.client) {
		document.addEventListener("click", handleClickOutside);
	}
});

onUnmounted(() => {
	if (import.meta.client) {
		document.removeEventListener("click", handleClickOutside);
	}
});
</script>

<template>
	<div ref="dropdownRef" class="relative">
		<button
			@click.stop="isOpen = !isOpen"
			class="flex items-center space-x-2 px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors rounded-md hover:bg-gray-800/50"
			aria-label="Change language">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-4 w-4"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
			</svg>
			<ClientOnly>
				<template #fallback>
					<span class="hidden sm:inline">{{ locale }}</span>
				</template>
				<span class="hidden sm:inline">{{ currentLocale?.name || locale }}</span>
			</ClientOnly>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-4 w-4 transition-transform"
				:class="{ 'rotate-180': isOpen }"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
			</svg>
		</button>

		<!-- Dropdown Menu -->
		<Transition
			enter-active-class="transition ease-out duration-100"
			enter-from-class="transform opacity-0 scale-95"
			enter-to-class="transform opacity-100 scale-100"
			leave-active-class="transition ease-in duration-75"
			leave-from-class="transform opacity-100 scale-100"
			leave-to-class="transform opacity-0 scale-95">
			<div
				v-if="isOpen"
				@click.stop
				class="absolute right-0 mt-2 w-48 rounded-lg shadow-xl bg-gray-900/95 backdrop-blur-md border border-gray-800/50 py-1 z-50">
				<button
					v-for="loc in locales"
					:key="loc.code"
					@click.stop="switchLanguage(loc.code)"
					class="w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800/50 transition-colors flex items-center justify-between"
					:class="{ 'bg-gray-800/50 text-white': locale === loc.code }">
					<span>{{ loc.name }}</span>
					<svg
						v-if="locale === loc.code"
						xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4 text-white"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
					</svg>
				</button>
			</div>
		</Transition>
	</div>
</template>

