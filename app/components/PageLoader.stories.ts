import type { Meta, StoryObj } from "@storybook/vue3";
import PageLoader from "./PageLoader.vue";

const meta: Meta<typeof PageLoader> = {
	title: "Components/PageLoader",
	component: PageLoader,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component: "A loading spinner component that displays while content is being fetched.",
			},
		},
	},
	argTypes: {
		message: {
			control: "text",
			description: "Loading message to display",
		},
	},
};

export default meta;
type Story = StoryObj<typeof PageLoader>;

export const Default: Story = {
	args: {
		message: "Loading content...",
	},
};

export const CustomMessage: Story = {
	args: {
		message: "Please wait while we load your data...",
	},
};

