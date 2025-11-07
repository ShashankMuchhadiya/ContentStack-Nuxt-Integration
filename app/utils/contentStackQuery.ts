import { QueryOperation } from "@contentstack/delivery-sdk";

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
		 * Note: Language is typically set at the stack level or via query parameters
		 * For ContentStack SDK v4, language handling may need to be done differently
		 */
		let query = contentstack
			// Return entries of the specific content type
			.contentType(content_type_uid)
			// Get entry query builder
			.entry()
			// Start defining a query for a single entry (this does not execute the query yet)
			.query();

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
				const methodArguments = options[option as keyof ContentStackQueryOptions];

				// Skip language as it's already handled above
				if (method === "language") {
					continue;
				}

				// For methods that take 2 arguments of key/value pairs, we're passing in an object containing them to correctly pass the arguments.
				if (
					typeof methodArguments === "object" &&
					!Array.isArray(methodArguments) &&
					(methodArguments as ContentStackMethodArguments).key &&
					(methodArguments as ContentStackMethodArguments).value
				) {
					// @ts-ignore We're dynamically calling a method below, and dynamically called methods are difficult to type. [option] is a ContentStack SDK method.
					query = query?.[method](
						(methodArguments as ContentStackMethodArguments).key,
						(methodArguments as ContentStackMethodArguments).value
					);
				} else {
					// @ts-ignore We're dynamically calling a method below, and dynamically called methods are difficult to type. [option] is a ContentStack SDK method.
					query = query?.[method](methodArguments);
				}
			}
		}

		/**
		 * Return the query object (not executed yet)
		 * The query will be executed with find() or findOne() in the calling functions
		 */
		return query;
	} catch (error) {
		contentStackError(error as ContentStackError);
	}
};
