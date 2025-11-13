import localeMapper from "@/utils/localeMapper";
import { useContentStackStore } from "@/stores/contentstack";
/**
 * Fetches a single entry or multiple entries from contentstack, and handles rendering the Nuxt error page when required.
 *
 * This is the primary function that should be used to fetch a pages data from ContentStack, it is used to determine if a route is valid or not, and will
 * handle rendering 404 errors, and other status codes when appropriate. This composable is intended to be used for page data exclusively. For example,
 * this composable should not be used to fetch a settings entry, or a navigation entry, because those are not entries that have a route/url on the site.
 * This should only be used to fetch a route's data, additional requests for other data outside of the primary page route's entry should be fetched directly
 * with fetchSingleEntry and fetchMultipleEntry utilities, so that they don't interfere with the status code returned by the primary page route.
 *
 * @param {Object} arguments Arguments object passed to the composable.
 * @property {String} arguments.content_type_uid The UID of the content type.
 * @property {String} arguments.language For localized entries, this should be the locale code for the language you want to fetch, this will fall back to the default en-us locale code.
 * @property {String} arguments.url The URL of the ContentStack entry if fetching a single document of a multiple entry type.
 * @property {Boolean} arguments.multiple When set to true, indicates to this composable that you want to fetch a multiple entry type, and get multiple results returned. Can be omitted or set to false when fetching a single entry.
 * @property {Object} arguments.options Additional options to be passed to ContentStack queries, such as 'includeReferences' and 'only'.
 * @property {String} arguments.key (Optional) Manually set the cache key passed to the useAsyncData composable.
 * @property {Object} arguments.trigger404 By default, if an entry is not found, a 404 error will be triggered, but you can disable a 404 from being triggered by setting this to false.
 */
export default async ({
	content_type_uid,
	language,
	url,
	multiple,
	options,
	key,
	trigger404,
}: {
	content_type_uid: string;
	language?: string;
	url?: string;
	multiple?: boolean;
	options?: any;
	key?: string;
	trigger404?: boolean;
}) => {
	// Get current locale from i18n if language is not explicitly provided
	// Map short locale codes (en, es, fr, de) to full ContentStack locale codes (en-us, es-es, fr-fr, de-de)
	const i18nLocale = (() => {
		try {
			return useI18n();
		} catch {
			// i18n might not be available yet
			return null;
		}
	})();

	// Make locale reactive
	const currentLocale = computed(() => {
		if (language) {
			return language;
		}
		if (i18nLocale?.locale?.value) {
			return i18nLocale.locale.value;
		}
		return "en";
	});

	// Map short locale to full ContentStack locale code
	// For ContentStack API, we might need to use short codes (fr) instead of full codes (fr-fr)
	// Try using short locale code first, fallback to full code if needed
	const currentLanguage = computed(() => {
		// For non-default languages, try using short code first
		// ContentStack might expect "fr" instead of "fr-fr"
		if (currentLocale.value !== "en") {
			// Return short locale code for API calls
			return currentLocale.value;
		}
		// For default (en), use full code
		return localeMapper(currentLocale.value);
	});

	// Generate Cache Key (include language in cache key) - make it reactive
	const cacheKey = computed(() => {
		return contentStackCacheKey({
			content_type_uid,
			url,
			options,
			key: key ? `${key}-${currentLanguage.value}` : undefined,
		});
	});

	try {
		// Get the Pinia store
		const contentStackStore = useContentStackStore();

		// Create a reactive cache key that updates when locale changes
		// Always include language in cache key to ensure different locales get different cache entries
		const dynamicCacheKey = computed(() => {
			const baseKey = contentStackCacheKey({
				content_type_uid,
				url,
				options,
				key: key || undefined,
			});
			// Always append language to cache key
			return `${baseKey}-${currentLanguage.value}`;
		});

		const asyncData = useAsyncData(
			dynamicCacheKey.value,
			// ContentStack Query - make it reactive to locale changes
			async () => {
				// Check Pinia store first for cached data
				// Use the base key (without language) so store can append language consistently
				const baseKey = contentStackCacheKey({
					content_type_uid,
					url,
					options,
					key: key || undefined,
				});
				const cachedData = contentStackStore.getCachedData(baseKey, currentLanguage.value);

				if (cachedData) {
					// Return cached data from Pinia store
					return cachedData;
				}

				// Set pending state
				contentStackStore.setPending(dynamicCacheKey.value, currentLanguage.value, true);

				try {
					/**
					 * Determine what type of query to execute based on the parameters,
					 * when multiple is true, we will fetch more than 1 entry, otherwise
					 * we fetch a single entry.
					 */
					const asyncDataResult =
						multiple === true
							? await fetchMultipleEntries({
									content_type_uid,
									language: currentLanguage.value,
									options,
								})
							: await fetchSingleEntry({
									content_type_uid,
									url,
									language: currentLanguage.value,
									options,
								});

					/**
					 * Validate Response
					 */
					// If result is false or null, return null to indicate no data
					if (asyncDataResult === false || asyncDataResult === null) {
						return null;
					}

					if (
						asyncDataResult?._content_type_uid === undefined &&
						asyncDataResult?.entries === undefined
					) {
						if (trigger404 !== false) {
							// Trigger 404 error
							await contentStackError();
						}
						contentStackStore.setPending(
							dynamicCacheKey.value,
							currentLanguage.value,
							false
						);
						return false;
					}

					// Cache the result in Pinia store
					// Use the base key (without language) so store can append language consistently
					const baseKey = contentStackCacheKey({
						content_type_uid,
						url,
						options,
						key: key || undefined,
					});
					contentStackStore.setCachedData(
						baseKey,
						currentLanguage.value,
						asyncDataResult
					);

					// Clear pending state
					contentStackStore.setPending(
						dynamicCacheKey.value,
						currentLanguage.value,
						false
					);

					// Return response
					return asyncDataResult;
				} catch (error) {
					// Clear pending state on error
					contentStackStore.setPending(
						dynamicCacheKey.value,
						currentLanguage.value,
						false
					);
					throw error;
				}
			},
			{
				// Only fetch if the result is not already available in the Nuxt cache.
				getCachedData(cacheKeyValue, nuxt) {
					// First check Pinia store
					// Extract base key from cacheKeyValue (remove language suffix if present)
					const baseKey = contentStackCacheKey({
						content_type_uid,
						url,
						options,
						key: key || undefined,
					});
					const storeData = contentStackStore.getCachedData(
						baseKey,
						currentLanguage.value
					);
					if (storeData) {
						return storeData;
					}

					// Then check Nuxt cache
					if (nuxt) {
						return nuxt.payload.data[cacheKeyValue] || nuxt.static.data[cacheKeyValue];
					}
					return undefined;
				},
				// Watch for locale changes and automatically refetch
				watch: [currentLanguage],
			}
		);

		// Watch for locale changes and refresh data
		// This ensures data is refetched when locale changes
		watch(
			currentLanguage,
			async (newLang, oldLang) => {
				// Always update when language changes, even if oldLang is undefined (initial load)
				if (newLang !== oldLang) {
					// Get the base cache key
					const baseKey = contentStackCacheKey({
						content_type_uid,
						url,
						options,
						key: key || undefined,
					});

					if (oldLang) {
						const oldKey = `${baseKey}-${oldLang}`;
						// Clear the old cache entry from Nuxt cache
						clearNuxtData(oldKey);
					}

					// Check if we have cached data in Pinia store for the new language
					const cachedData = contentStackStore.getCachedData(baseKey, newLang);

					if (cachedData) {
						// Use cached data from Pinia store - no API call needed!
						// Deep clone to force reactivity
						asyncData.data.value = JSON.parse(JSON.stringify(cachedData));
					} else {
						// No cached data, fetch from API
						const newKey = `${baseKey}-${newLang}`;
						// Clear the new cache key to ensure fresh data
						clearNuxtData(newKey);

						// Force refresh - this will use the new language from currentLanguage.value
						// The fetch function will use currentLanguage.value which is reactive
						try {
							// Refresh will use the current language value
							// This will fetch new data and update the data ref
							await asyncData.refresh();

							// Ensure data is properly set after refresh
							if (asyncData.data.value) {
								// Deep clone to force reactivity
								asyncData.data.value = JSON.parse(
									JSON.stringify(asyncData.data.value)
								);
							}
						} catch (error) {
							console.error("Error refreshing data:", error);
						}
					}
				}
			},
			{ immediate: false }
		);

		return asyncData;
	} catch (error: unknown) {
		contentStackError(error);
		// Return empty async data result to prevent undefined
		return useAsyncData(
			contentStackCacheKey({ content_type_uid, url, options, key }),
			async () => false
		);
	}
};
