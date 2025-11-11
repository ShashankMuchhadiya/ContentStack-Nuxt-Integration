import type { Meta, StoryObj } from "@storybook/vue3";
import AboutUsPage from "./about-us.vue";

const meta: Meta<typeof AboutUsPage> = {
	title: "Pages/About Us",
	component: AboutUsPage,
	tags: ["autodocs"],
	parameters: {
		layout: "fullscreen",
	},
};

export default meta;
type Story = StoryObj<typeof AboutUsPage>;

export const Default: Story = {
	decorators: [
		() => ({
			template: '<div class="min-h-screen bg-gray-950"><story /></div>',
		}),
	],
};

