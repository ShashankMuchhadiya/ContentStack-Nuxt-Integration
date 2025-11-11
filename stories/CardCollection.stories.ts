import type { Meta, StoryObj } from "@storybook/vue3";
import CardCollection from "../app/components/CardCollection.vue";

const meta: Meta<typeof CardCollection> = {
	title: "Components/CardCollection",
	component: CardCollection,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component: "A card collection component that displays a grid of cards with images, titles, and CTAs from ContentStack.",
			},
		},
	},
	argTypes: {
		cardCollection: {
			control: "object",
			description: "Card collection data from ContentStack",
		},
	},
};

export default meta;
type Story = StoryObj<typeof CardCollection>;

export const Default: Story = {
	args: {
		cardCollection: {
			header: {
				heading: "Featured Products",
				sub_heading: "Discover our latest collection of premium products",
			},
			cards: [
				{
					title: "Product 1",
					image: {
						url: "https://via.placeholder.com/400x300",
						title: "Product 1",
					},
					image_alt_text: "Product 1 image",
					cta: {
						text: "Learn More",
						link: [
							{
								_content_type_uid: "page",
								uid: "product-1",
							},
						],
					},
				},
				{
					title: "Product 2",
					image: {
						url: "https://via.placeholder.com/400x300",
						title: "Product 2",
					},
					image_alt_text: "Product 2 image",
					cta: {
						text: "Learn More",
						link: [
							{
								_content_type_uid: "page",
								uid: "product-2",
							},
						],
					},
				},
				{
					title: "Product 3",
					image: {
						url: "https://via.placeholder.com/400x300",
						title: "Product 3",
					},
					image_alt_text: "Product 3 image",
					cta: {
						text: "Learn More",
						link: [
							{
								_content_type_uid: "page",
								uid: "product-3",
							},
						],
					},
				},
				{
					title: "Product 4",
					image: {
						url: "https://via.placeholder.com/400x300",
						title: "Product 4",
					},
					image_alt_text: "Product 4 image",
					cta: {
						text: "Learn More",
						link: [
							{
								_content_type_uid: "page",
								uid: "product-4",
							},
						],
					},
				},
			],
		},
	},
};

export const WithoutHeader: Story = {
	args: {
		cardCollection: {
			cards: [
				{
					title: "Card 1",
					image: {
						url: "https://via.placeholder.com/400x300",
						title: "Card 1",
					},
					cta: {
						text: "View Details",
						link: [
							{
								_content_type_uid: "page",
								uid: "card-1",
							},
						],
					},
				},
				{
					title: "Card 2",
					image: {
						url: "https://via.placeholder.com/400x300",
						title: "Card 2",
					},
					cta: {
						text: "View Details",
						link: [
							{
								_content_type_uid: "page",
								uid: "card-2",
							},
						],
					},
				},
			],
		},
	},
};

