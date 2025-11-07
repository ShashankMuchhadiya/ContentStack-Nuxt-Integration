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
	try {
		return useAsyncData(
			// Generate Cache Key
			contentStackCacheKey({ content_type_uid, url, options, key }),
			// ContentStack Query
			async () => {
				/**
				 * Determine what type of query to execute based on the parameters,
				 * when multiple is true, we will fetch more than 1 entry, otherwise
				 * we fetch a single entry.
				 */
				const asyncData =
					multiple === true
						? await fetchMultipleEntries({
								content_type_uid,
								language,
								options,
						  })
						: await fetchSingleEntry({
								content_type_uid,
								url,
								language,
								options,
						  });
				/**
				 * Validate Response
				 */
				if (asyncData?._content_type_uid === undefined && asyncData?.entries === undefined) {
					if (trigger404 !== false) {
						// Trigger 404 error
						await contentStackError();
					}
					return false;
				}

				// Return response
				return asyncData;
			},
			{
				// Only fetch if the result is not already available in the Nuxt cache.
				getCachedData(key, nuxt) {
					return nuxt.payload.data[key] || nuxt.static.data[key];
				},
			}
		);
	} catch (error: unknown) {
		contentStackError(error as ContentStackError);
		// Return empty async data result to prevent undefined
		return useAsyncData(contentStackCacheKey({ content_type_uid, url, options, key }), async () => false);
	}
};
