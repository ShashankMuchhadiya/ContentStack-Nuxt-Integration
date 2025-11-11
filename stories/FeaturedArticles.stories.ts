import type { Meta, StoryObj } from "@storybook/vue3";
import FeaturedArticles from "../app/components/FeaturedArticles.vue";

const meta: Meta<typeof FeaturedArticles> = {
	title: "Components/FeaturedArticles",
	component: FeaturedArticles,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component: "A component that displays a grid of featured articles from ContentStack.",
			},
		},
	},
	argTypes: {
		featuredArticles: {
			control: "object",
			description: "Featured articles data from ContentStack",
		},
	},
};

export default meta;
type Story = StoryObj<typeof FeaturedArticles>;

export const Default: Story = {
	args: {
		featuredArticles: {
			heading: "Latest Articles",
			sub_heading: "Stay updated with our latest news and insights",
			articles: [
				{
					_content_type_uid: "article",
					uid: "article-1",
				},
				{
					_content_type_uid: "article",
					uid: "article-2",
				},
				{
					_content_type_uid: "article",
					uid: "article-3",
				},
				{
					_content_type_uid: "article",
					uid: "article-4",
				},
			],
		},
	},
};

export const SingleArticle: Story = {
	args: {
		featuredArticles: {
			heading: "Featured Article",
			sub_heading: "Read our featured story",
			articles: [
				{
					_content_type_uid: "article",
					uid: "featured-article",
				},
			],
		},
	},
};

