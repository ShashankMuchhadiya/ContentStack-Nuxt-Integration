/**
 * Fetches array of all entries of a "Multiple" content type, by automatically paginating through.
 * @see https://www.contentstack.com/docs/developers/create-content-types/single-vs-multiple-content-types
 *
 * @param {Object} arguments Arguments object passed to the composable.
 * @property {String} arguments.content_type_uid The UID of the content type.
 * @property {String} arguments.language For localized entries, this should be the locale code for the language you want to fetch, this will fall back to the default en-us locale code.
 * @property {Object} arguments.options Additional options to be passed to ContentStack queries, such as 'includeReferences' and 'only'.
 */
export default async ({ content_type_uid, language, options }: { content_type_uid: string; language?: string; options?: ContentStackQueryOptions }) => {
  try {
    // Pagination per-page limit
    const limit = typeof options?.limit === 'number' && options.limit > 0 ? options.limit : 100;

    // Prepare Query
    const query = await contentStackQuery({
      content_type_uid,
      language,
      options: {
        ...options,
        limit
      }
    });

    // Execute Query
    const data = await query?.includeCount().find();

    // First page of entries
    const entries = data[0];

    // Total Entries Count
    const totalCount = data[1];

    // Check if there are additional pages to fetch
    if (totalCount > entries.length) {
      // Determine how many pages to fetch
      const pages = Math.ceil(totalCount / limit);
      // Start forloop at page 1, since we've already fetched it.
      for (let page = 1; page <= pages; page++) {
        // Fetch the next page
        const nextPage = await contentStackQuery({
          content_type_uid,
          language,
          options: {
            ...options,
            limit,
            skip: page * limit
          }
        });
        const nextPageData = await nextPage?.includeCount().find();
        // Merge next page of entries, with all previously fetched page of entries.
        data[0].push(...nextPageData[0]);
      }
    }

    // Transform Entries
    const mappedEntries =
      Array.isArray(data) && data.length > 0 && Array.isArray(data[0])
        ? data[0].map((entry) => ({ _content_type_uid: content_type_uid, ...entry }))
        : { _content_type_uid: content_type_uid, ...data };

    // Total Count
    const count = Array.isArray(data) && data.length > 1 ? { totalCount } : {};

    return {
      entries: mappedEntries,
      ...count
    };
  } catch (error: unknown) {
    return false;
  }
};
