import type { Meta, StoryObj } from "@storybook/vue3";
import TextImageCarousel from "./TextImageCarousel.vue";

const meta: Meta<typeof TextImageCarousel> = {
	title: "Components/TextImageCarousel",
	component: TextImageCarousel,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component: "A carousel component that displays multiple items with text and images, supporting different image positions from ContentStack.",
			},
		},
	},
	argTypes: {
		carousel: {
			control: "object",
			description: "Carousel data from ContentStack",
		},
	},
};

export default meta;
type Story = StoryObj<typeof TextImageCarousel>;

export const Default: Story = {
	args: {
		carousel: {
			styles: {
				image_position: "left",
			},
			carousel_items: [
				{
					heading: "Feature One",
					content: "<p>This is the first feature description. It explains the key benefits and capabilities.</p>",
					image: {
						url: "https://via.placeholder.com/600x600",
						title: "Feature One Image",
					},
					image_alt_text: "Feature one showcase",
					cta: [
						{
							text: "Learn More",
							link: [
								{
									_content_type_uid: "page",
									uid: "feature-one",
								},
							],
						},
					],
				},
				{
					heading: "Feature Two",
					content: "<p>This is the second feature description. It highlights another important aspect.</p>",
					image: {
						url: "https://via.placeholder.com/600x600",
						title: "Feature Two Image",
					},
					image_alt_text: "Feature two showcase",
					cta: [
						{
							text: "Explore",
							link: [
								{
									_content_type_uid: "page",
									uid: "feature-two",
								},
							],
						},
					],
				},
			],
		},
	},
};

export const ImageRight: Story = {
	args: {
		carousel: {
			styles: {
				image_position: "right",
			},
			carousel_items: [
				{
					heading: "Right Aligned Image",
					content: "<p>This carousel item has the image on the right side for visual variety.</p>",
					image: {
						url: "https://via.placeholder.com/600x600",
						title: "Right Image",
					},
					image_alt_text: "Right aligned image",
					cta: [
						{
							text: "View Details",
							link: [
								{
									_content_type_uid: "page",
									uid: "details",
								},
							],
						},
					],
				},
			],
		},
	},
};

