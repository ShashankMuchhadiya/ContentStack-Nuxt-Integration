import type { Meta, StoryObj } from "@storybook/vue3";
import EmptyState from "../app/components/EmptyState.vue";

const meta: Meta<typeof EmptyState> = {
	title: "Components/EmptyState",
	component: EmptyState,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component: "A component that displays an empty state message when no data is available.",
			},
		},
	},
	argTypes: {
		title: {
			control: "text",
			description: "Title text to display",
		},
		message: {
			control: "text",
			description: "Message text to display",
		},
	},
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
	args: {
		title: "Welcome",
		message: "No data available",
	},
};

export const WithTitleOnly: Story = {
	args: {
		title: "Nothing Here",
	},
};

export const WithMessageOnly: Story = {
	args: {
		message: "This section is currently empty",
	},
};

