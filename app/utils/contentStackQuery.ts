import { QueryOperation } from "@contentstack/delivery-sdk";
import type { ContentStackQueryOptions } from "@/types/contentstack";

export default async ({
	content_type_uid,
	url,
	options,
	language,
}: {
	content_type_uid: string;
	url?: string;
	options?: ContentStackQueryOptions;
	language?: string;
}) => {
	try {
		// Instantinate Stack
		const contentstack = await contentStackSDK();

		/**
		 * Build ContentStack query, and add options passed to this composable.
		 * @see https://www.contentstack.com/docs/developers/sdks/content-delivery-sdk/javascript-browser/reference#query
		 */
		if (!contentstack) {
			throw new Error("ContentStack SDK not initialized");
		}

		/**
		 * Build ContentStack query
		 * Use locale as a query parameter instead of in the path
		 * Format: /v3/content_types/{content_type_uid}/entries?locale={locale}
		 */
		let query = contentstack
			// Return entries of the specific content type
			.contentType(content_type_uid)
			// Get entry query builder
			.entry()
			// Start defining a query for a single entry (this does not execute the query yet)
			.query();

		// Add locale to query if language is provided and not default (en or en-us)
		// ContentStack SDK v4 uses addParams to add query parameters
		// Only add locale if it's not the default language
		if (language && language !== "en-us" && language !== "en") {
			// Try to use addParams method to add locale as query parameter
			if (typeof (query as any)?.addParams === "function") {
				(query as any).addParams({ locale: language });
			}
			// Fallback: Try to use locale method if available
			else if (typeof (query as any)?.locale === "function") {
				query = (query as any).locale(language);
			}
			// Fallback: Try to use language method if available
			else if (typeof (query as any)?.language === "function") {
				query = (query as any).language(language);
			}
		}

		/**
		 * Return the entry of the provided URL
		 */
		if (typeof url === "string" && url.length) {
			const urlValue = url.startsWith("/") ? url : `/${url}`;
			query = query?.where("url", QueryOperation.EQUALS, urlValue);
		}

		/**
		 * Loop through all options, and add them to the query with their respective function call.
		 *
		 * To elaborate on what this is doing, the 'options' object of this composable should contain
		 * key/value pairs for a ContentStack SDK method (key) and it's argument (value). For example,
		 * if the 'options' contain the key 'only' with the value ['title']. The loop below would call
		 * query.only(['title']). It's a loop that allows us to dynamically pass in the ContentStack
		 * SDK's method calls as needed. This allows us to pass in options modifications to queries
		 * however we need to inside of this composable.
		 *
		 * For instance, we may want to paginate the query, or limit which fields get returned if the
		 * result will just be used for cards, and doesn't require the whole document.
		 */
		if (options) {
			for (const option in options) {
				const method = option;
				const methodArguments = options[option];

				// Skip language and locale as they're handled separately
				if (method === "language" || method === "locale") {
					continue;
				}

				// Check if the method exists on the query object before calling it
				// @ts-expect-error - We're dynamically calling methods on the query object
				if (typeof query?.[method] !== "function") {
					console.warn(
						`Method ${method} is not available on the query object, skipping...`
					);
					continue;
				}

				// For methods that take 2 arguments of key/value pairs, we're passing in an object containing them to correctly pass the arguments.
				if (
					typeof methodArguments === "object" &&
					!Array.isArray(methodArguments) &&
					methodArguments !== null &&
					"key" in methodArguments &&
					"value" in methodArguments
				) {
					// @ts-expect-error - We're dynamically calling methods on the query object
					query = query?.[method](methodArguments.key, methodArguments.value);
				} else {
					// @ts-expect-error - We're dynamically calling methods on the query object
					query = query?.[method](methodArguments);
				}
			}
		}

		/**
		 * Return the query object (not executed yet)
		 * The query will be executed with find() or findOne() in the calling functions
		 */
		return query;
	} catch (error: unknown) {
		contentStackError(error);
	}
};
