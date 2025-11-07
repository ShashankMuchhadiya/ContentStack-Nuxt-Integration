/**
 * Fetches an array of entries of a "Multiple" content type
 * @see https://www.contentstack.com/docs/developers/create-content-types/single-vs-multiple-content-types
 *
 * @param {Object} arguments Arguments object passed to the composable.
 * @property {String} arguments.content_type_uid The UID of the content type.
 * @property {String} arguments.language For localized entries, this should be the locale code for the language you want to fetch, this will fall back to the default en-us locale code.
 * @property {Object} arguments.options Additional options to be passed to ContentStack queries, such as 'includeReferences' and 'only'.
 */
export default async ({ content_type_uid, language, options }: { content_type_uid: string; language?: string; options?: ContentStackQueryOptions }) => {
  try {
    // Prepare Query
    const query = await contentStackQuery({
      content_type_uid,
      language,
      options
    });

    // Execute Query
    const data = await query?.includeCount().find();

    // Transform Entries
    // Add _content_type_uid to response, for link resolution purposes.
    const entries =
      Array.isArray(data) && data.length > 0 && Array.isArray(data[0])
        ? data[0].map((entry) => ({ _content_type_uid: content_type_uid, ...entry }))
        : { _content_type_uid: content_type_uid, ...data };

    // Total Count
    const count = Array.isArray(data) && data.length > 1 ? { totalCount: data[1] } : {};

    return {
      entries,
      ...count
    };
  } catch (error: unknown) {
    return false;
  }
};
