import type { HomePage } from "@/types/contentstack";

interface SEOOptions {
	title?: string;
	description?: string;
	image?: string;
	url?: string;
	canonical?: string;
	noIndex?: boolean;
	type?: string;
	publishedTime?: string;
	modifiedTime?: string;
}

export const useSEO = (options: SEOOptions) => {
	const config = useRuntimeConfig();
	const route = useRoute();
	const siteUrl = config.public.siteUrl || process.env.NUXT_PUBLIC_SITE_URL || "https://example.com";
	const currentUrl = `${siteUrl}${route.path}`;
	const imageUrl = options.image
		? options.image.startsWith("http")
			? options.image
			: `${siteUrl}${options.image}`
		: `${siteUrl}/og-image.jpg`;

	const title = options.title || "ContentStack Integration";
	const description = options.description || "Modern Nuxt.js application integrated with ContentStack CMS";

	useHead({
		title,
		htmlAttrs: {
			lang: "en",
		},
		meta: [
			{ charset: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ name: "description", content: description },
			{ name: "robots", content: options.noIndex ? "noindex,nofollow" : "index,follow" },
			{ name: "author", content: "ContentStack Integration" },
			{ name: "theme-color", content: "#111827" },

			// Open Graph
			{ property: "og:type", content: options.type || "website" },
			{ property: "og:title", content: title },
			{ property: "og:description", content: description },
			{ property: "og:image", content: imageUrl },
			{ property: "og:url", content: options.url || currentUrl },
			{ property: "og:site_name", content: "ContentStack Integration" },
			{ property: "og:locale", content: "en_US" },

			// Twitter Card
			{ name: "twitter:card", content: "summary_large_image" },
			{ name: "twitter:title", content: title },
			{ name: "twitter:description", content: description },
			{ name: "twitter:image", content: imageUrl },

			// Article meta (if type is article)
			...(options.type === "article" && options.publishedTime
				? [
						{ property: "article:published_time", content: options.publishedTime },
						...(options.modifiedTime
							? [{ property: "article:modified_time", content: options.modifiedTime }]
							: []),
					]
				: []),
		],
		link: [
			...(options.canonical || currentUrl
				? [{ rel: "canonical", href: options.canonical || currentUrl }]
				: []),
		],
	});

	// Structured Data (JSON-LD)
	useHead({
		script: [
			{
				type: "application/ld+json",
				children: JSON.stringify({
					"@context": "https://schema.org",
					"@type": options.type === "article" ? "Article" : "WebSite",
					name: title,
					description: description,
					url: options.url || currentUrl,
					...(options.type === "article"
						? {
								headline: title,
								image: imageUrl,
								datePublished: options.publishedTime,
								dateModified: options.modifiedTime || options.publishedTime,
								author: {
									"@type": "Organization",
									name: "ContentStack Integration",
								},
								publisher: {
									"@type": "Organization",
									name: "ContentStack Integration",
								},
							}
						: {
								potentialAction: {
									"@type": "SearchAction",
									target: {
										"@type": "EntryPoint",
										urlTemplate: `${siteUrl}/search?q={search_term_string}`,
									},
									"query-input": "required name=search_term_string",
								},
							}),
				}),
			},
		],
	});
};

