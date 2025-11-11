/**
 * Maps short locale codes (used in routes) to full ContentStack locale codes
 * @param shortLocale - Short locale code (e.g., "fr", "es", "de", "en")
 * @returns Full ContentStack locale code (e.g., "fr-fr", "es-es", "de-de", "en-us")
 */
export default function localeMapper(shortLocale: string): string {
	const localeMap: Record<string, string> = {
		en: "en-us",
		es: "es-es",
		fr: "fr-fr",
		de: "de-de",
	};

	return localeMap[shortLocale] || shortLocale || "en-us";
}

/**
 * Gets the short locale code from a full ContentStack locale code
 * @param fullLocale - Full ContentStack locale code (e.g., "fr-fr", "es-es")
 * @returns Short locale code (e.g., "fr", "es")
 */
export function getShortLocale(fullLocale: string): string {
	const reverseMap: Record<string, string> = {
		"en-us": "en",
		"es-es": "es",
		"fr-fr": "fr",
		"de-de": "de",
	};

	return reverseMap[fullLocale] || fullLocale || "en";
}

