import type { ContentStackQueryOptions } from "@/types/contentstack";

/**
 * Generate a unique cache key to be passed to the useAsyncData composable
 * for API requests to ContentStack.
 *
 * @param {Object} arguments Arguments object passed to the composable.
 * @property {String} arguments.content_type_uid The UID of the content type.
 * @property {String} arguments.url The URL of the ContentStack entry if fetching a single document of a multiple entry type.
 * @property {Object} arguments.page The page number of a paginated request for a multiple entry type.
 * @property {Object} arguments.options Additional options to be passed to ContentStack queries, such as 'includeReferences' and 'only'.
 * @property {String} arguments.key (Optional) Manually set the cache key rather than automatically creating one from the supplied arguments.
 */
export default ({
  content_type_uid,
  url,
  page,
  all,
  options,
  key
}: {
  content_type_uid: string;
  url?: string;
  page?: string | number;
  all?: boolean;
  options?: ContentStackQueryOptions;
  key?: string;
}): string => {
  switch (true) {
    // If a custom cache key is passed, use the provided key.
    case key !== undefined && typeof key === 'string' && key.length > 0:
      return `${key}`;
    // If all entries are being fetched, but using an 'only' to select only certain fields, use a unique cache key.
    case all === true && Array.isArray(options?.only) && options.only.length > 0:
      return `${content_type_uid}-all-${typeof url === 'string' && url.length > 0 ? `${url}-` : ''}only-${options.only.join('-')}`;
    // If a query uses 'only' to select only certain fields, use a unique cache key.
    case Array.isArray(options?.only) && options.only.length > 0:
      return `${content_type_uid}-${typeof url === 'string' && url.length > 0 ? `${url}-` : ''}only-${options.only.join('-')}`;
    // When all entries have been fetched
    case content_type_uid && all === true:
      return `${content_type_uid}-all`;
    // For multiple entries of a content type, set the key to be the content type and it's page of results.
    case content_type_uid && page !== undefined:
      return `${content_type_uid}-${page ? page : 1}`;
    // For a single entry of a multiple content type, set the key to be the content type and it's unique URL.
    case content_type_uid && url !== undefined:
      return `${content_type_uid}-${url}`;
    // For single content types, set the content type as the key.
    default:
      return content_type_uid;
  }
};
