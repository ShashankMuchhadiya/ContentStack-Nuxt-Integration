import { showError } from 'nuxt/app';

/**
 * ContentStack Error Handler
 * @param {ContentStackError | string} error An error object caught in a try/catch, or manually passed to this composable.
 */
export default async (error?: ContentStackError | string) => {
  // Don't show errors if SDK is not initialized (likely missing env vars)
  if (typeof error === 'string' && error.includes('ContentStack SDK not initialized')) {
    return;
  }

  // Always log the error to the console
  if (error !== undefined) {
    console.error(error);
  }

  // Render the Nuxt Error Page
  switch (true) {
    // If an error string is passed, return a 500 error with the error message.
    case typeof error === 'string' && error.length > 0:
      showError({
        statusCode: 500,
        statusMessage: error as string
      });
      break;

    // If an error object is passed, render the error page with it's status code and message.
    case (error as ContentStackError)?.status !== undefined && (error as ContentStackError)?.error_message !== undefined:
      showError({
        statusCode: (error as ContentStackError)?.status,
        statusMessage: (error as ContentStackError)?.error_message
      });
      break;

    // Otherwise, always return a 404 error message to the user.
    default:
      showError({
        statusCode: 404,
        statusMessage: 'Not Found'
      });
  }
};
