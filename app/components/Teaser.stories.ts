import type { Meta, StoryObj } from "@storybook/vue3";
import Teaser from "./Teaser.vue";

const meta: Meta<typeof Teaser> = {
	title: "Components/Teaser",
	component: Teaser,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component: "A teaser component that displays content with images or videos, supporting left/right alignment from ContentStack.",
			},
		},
	},
	argTypes: {
		teaser: {
			control: "object",
			description: "Teaser data from ContentStack",
		},
	},
};

export default meta;
type Story = StoryObj<typeof Teaser>;

export const Default: Story = {
	args: {
		teaser: {
			heading: "Welcome to Our Platform",
			content: "<p>Discover amazing features and capabilities that will transform your workflow. Our platform is designed to help you achieve more with less effort.</p>",
			styles: {
				text_align: "Left",
			},
			image: [
				{
					image: {
						url: "https://via.placeholder.com/600x600",
						title: "Teaser Image",
					},
					image_alt_text: "Platform overview",
				},
			],
			cta: [
				{
					text: "Get Started",
					link: [
						{
							_content_type_uid: "page",
							uid: "get-started",
						},
					],
				},
				{
					text: "Learn More",
					external_url: "https://example.com",
				},
			],
		},
	},
};

export const RightAligned: Story = {
	args: {
		teaser: {
			heading: "Innovation at Your Fingertips",
			content: "<p>Experience cutting-edge technology that adapts to your needs. Built for modern teams who demand excellence.</p>",
			styles: {
				text_align: "Right",
			},
			image: [
				{
					image: {
						url: "https://via.placeholder.com/600x600",
						title: "Innovation Image",
					},
					image_alt_text: "Innovation showcase",
				},
			],
			cta: [
				{
					text: "Explore Features",
					link: [
						{
							_content_type_uid: "page",
							uid: "features",
						},
					],
				},
			],
		},
	},
};

export const WithVideo: Story = {
	args: {
		teaser: {
			heading: "Watch Our Demo",
			content: "<p>See how our platform works in action. Watch this short video to understand the key features.</p>",
			styles: {
				text_align: "Left",
			},
			video: {
				video: {
					url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
				},
				video_alt_text: "Platform demo video",
			},
			cta: [
				{
					text: "Start Free Trial",
					link: [
						{
							_content_type_uid: "page",
							uid: "trial",
						},
					],
				},
			],
		},
	},
};

