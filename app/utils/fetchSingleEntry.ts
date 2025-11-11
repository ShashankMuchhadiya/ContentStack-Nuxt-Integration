/**
 * Fetches the entry of a "Single" content type, or a single entry of a "Multiple" content type.
 * @see https://www.contentstack.com/docs/developers/create-content-types/single-vs-multiple-content-types
 *
 * @param {Object} arguments Arguments object passed to the composable.
 * @property {String} arguments.content_type_uid The UID of the content type.
 * @property {String} arguments.url The URL of the ContentStack entry.
 * @property {String} arguments.language For localized entries, this should be the locale code for the language you want to fetch, this will fall back to the default en-us locale code.
 * @property {Object} arguments.options Additional options to be passed to ContentStack queries, such as 'includeReferences' and 'only'.
 */
export default async ({
	content_type_uid,
	url,
	language,
	options,
}: {
	content_type_uid: string;
	url?: string;
	language?: string;
	options?: ContentStackQueryOptions;
}) => {
	try {
		// Instantiate Stack
		const contentstack = await contentStackSDK();

		if (!contentstack) {
			throw new Error("ContentStack SDK not initialized");
		}

		let entry;

		// For single content types (no URL), use query().find() and get first result
		if (!url || url.length === 0) {
			const query = await contentStackQuery({
				content_type_uid,
				language,
				options,
			});
			// Execute query - only pass locale if language is provided and not default
			// @ts-expect-error - find() might accept locale parameter
			const results = language && language !== "en-us" && language !== "en"
				? await query?.find({ locale: language })
				: await query?.find();

			// Handle different response structures
			// Response can be: { entries: [...] } or directly an array
			if (results && typeof results === "object" && "entries" in results) {
				// Response has entries wrapper
				entry = Array.isArray(results.entries) && results.entries.length > 0 ? results.entries[0] : null;
			} else if (Array.isArray(results) && results.length > 0) {
				// Response is directly an array
				entry = results[0];
			} else {
				// Response is a single object
				entry = results;
			}
		} else {
			// For multiple content types with URL, use query with where clause
			const query = await contentStackQuery({
				content_type_uid,
				url,
				language,
				options,
			});

			// Execute Query - find() returns array or object with entries
			// Only pass locale if language is provided and not default
			// @ts-expect-error - find() might accept locale parameter
			const results = language && language !== "en-us" && language !== "en"
				? await query?.find({ locale: language })
				: await query?.find();

			// Handle different response structures
			if (results && typeof results === "object" && "entries" in results) {
				// Response has entries wrapper
				entry = Array.isArray(results.entries) && results.entries.length > 0 ? results.entries[0] : null;
			} else if (Array.isArray(results) && results.length > 0) {
				// Response is directly an array
				entry = results[0];
			} else {
				// Response is a single object
				entry = results;
			}
		}

		// Transform Entry
		// Add _content_type_uid to response, for link resolution purposes.
		if (entry) {
			return { _content_type_uid: content_type_uid, ...entry };
		}

		return false;
	} catch (error: unknown) {
		console.error("Error fetching single entry:", error);
		return false;
	}
};
