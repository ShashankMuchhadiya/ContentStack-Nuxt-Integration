import type { Meta, StoryObj } from "@storybook/vue3";
import IndexPage from "./index.vue";

const meta: Meta<typeof IndexPage> = {
	title: "Pages/Home",
	component: IndexPage,
	tags: ["autodocs"],
	parameters: {
		layout: "fullscreen",
	},
};

export default meta;
type Story = StoryObj<typeof IndexPage>;

export const Default: Story = {
	decorators: [
		() => ({
			template: '<div class="min-h-screen bg-gray-950"><story /></div>',
		}),
	],
};

