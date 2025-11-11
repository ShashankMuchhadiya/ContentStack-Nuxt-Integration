import type { Meta, StoryObj } from "@storybook/vue3";
import SlugPage from "./[...slug].vue";

const meta: Meta<typeof SlugPage> = {
	title: "Pages/Dynamic Slug",
	component: SlugPage,
	tags: ["autodocs"],
	parameters: {
		layout: "fullscreen",
	},
};

export default meta;
type Story = StoryObj<typeof SlugPage>;

export const Default: Story = {
	decorators: [
		() => ({
			template: '<div class="min-h-screen bg-gray-950"><story /></div>',
		}),
	],
};

