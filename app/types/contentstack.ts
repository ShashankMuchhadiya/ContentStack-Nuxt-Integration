// ContentStack Type Definitions

// ContentStack Error Type
export interface ContentStackError {
	status?: number;
	error_message?: string;
	error_code?: string;
	errors?: Record<string, unknown>;
}

// ContentStack Method Arguments
export interface ContentStackMethodArguments {
	key: string;
	value: unknown;
}

// ContentStack Query Options
export interface ContentStackQueryOptions {
	limit?: number;
	skip?: number;
	only?: string[];
	except?: string[];
	includeReference?: string[];
	includeCount?: boolean;
	[key: string]: unknown;
}

export interface ContentStackFile {
	uid: string;
	created_at: string;
	updated_at: string;
	created_by: string;
	updated_by: string;
	content_type: string;
	file_size: string;
	tags: string[];
	filename: string;
	url: string;
	ACL: Record<string, unknown>[];
	is_dir: boolean;
	parent_uid: string;
	_version: number;
	title: string;
	_metadata?: Record<string, unknown>;
	publish_details: {
		environment: string;
		locale: string;
		time: string;
		user: string;
	};
	$?: Record<string, unknown>;
}

export interface ContentStackLink {
	uid: string;
	_content_type_uid: string;
	external_url?: string;
	$?: Record<string, unknown>;
}

export interface ContentStackCTA {
	text: string;
	link?: ContentStackLink[];
	external_url?: string;
	$?: Record<string, unknown>;
}

export interface ContentStackHeader {
	heading?: string;
	sub_heading?: string;
	$?: Record<string, unknown>;
}

export interface ContentStackCard {
	title?: string;
	image?: ContentStackFile;
	image_alt_text?: string;
	cta?: ContentStackCTA;
	$?: Record<string, unknown>;
}

export interface CardCollection {
	header?: ContentStackHeader;
	cards?: ContentStackCard[];
	$?: Record<string, unknown>;
}

export interface TeaserImage {
	image?: ContentStackFile;
	image_alt_text?: string;
	$?: Record<string, unknown>;
}

export interface TeaserVideo {
	video?: ContentStackFile;
	video_alt_text?: string;
	$?: Record<string, unknown>;
}

export interface TeaserStyles {
	text_align?: "Left" | "Right";
}

export interface Teaser {
	heading?: string;
	content?: string;
	cta?: ContentStackCTA[];
	image?: TeaserImage[];
	video?: TeaserVideo;
	styles?: TeaserStyles;
	$?: Record<string, unknown>;
}

export interface CarouselItemStyles {
	theme?: "light" | "dark";
}

export interface CarouselItem {
	heading?: string;
	content?: string;
	image?: ContentStackFile;
	image_alt_text?: string;
	cta?: ContentStackCTA[];
	styles?: CarouselItemStyles;
	$?: Record<string, unknown>;
}

export interface CarouselStyles {
	image_position?: "left" | "right";
}

export interface TextImageCarousel {
	carousel_items?: CarouselItem[];
	styles?: CarouselStyles;
	$?: Record<string, unknown>;
}

export interface FeaturedArticle {
	uid: string;
	_content_type_uid: string;
	$?: Record<string, unknown>;
}

export interface FeaturedArticles {
	heading?: string;
	sub_heading?: string;
	articles?: FeaturedArticle[];
	$?: Record<string, unknown>;
}

export interface HomePageComponent {
	card_collection?: CardCollection;
	teaser?: Teaser;
	text_and_image_carousel?: TextImageCarousel;
	$?: Record<string, unknown>;
}

export interface HomePageSEO {
	title?: string;
	description?: string;
	canonical_url?: string;
	no_index?: boolean;
}

export interface HomePage {
	uid: string;
	title: string;
	components?: HomePageComponent[];
	featured_articles?: FeaturedArticles;
	seo?: HomePageSEO;
	$?: Record<string, unknown>;
	_version?: number;
	_metadata?: Record<string, unknown>;
}

