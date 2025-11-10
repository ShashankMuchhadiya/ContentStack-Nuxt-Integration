import type { ContentStackLink } from "@/types/contentstack";

/**
 * Helper function to get link URL from ContentStack link reference
 * @param link - ContentStack link reference array
 * @returns URL string
 */
export default function getLinkUrl(link: ContentStackLink[] | undefined | null): string {
	if (!link || !Array.isArray(link) || link.length === 0) return "#";
	const firstLink = link[0];
	if (firstLink.external_url) return firstLink.external_url;
	if (!firstLink._content_type_uid || !firstLink.uid) return "#";
	// Build URL based on content type
	if (firstLink._content_type_uid === "article_listing_page") {
		return "/articles";
	} else if (firstLink._content_type_uid === "landing_page") {
		return `/landing-page/${firstLink.uid}`;
	} else if (firstLink._content_type_uid === "article") {
		return `/article/${firstLink.uid}`;
	}
	return `/${firstLink._content_type_uid}/${firstLink.uid}`;
}

