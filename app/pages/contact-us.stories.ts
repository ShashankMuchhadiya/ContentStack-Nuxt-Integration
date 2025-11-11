import type { Meta, StoryObj } from "@storybook/vue3";
import ContactUsPage from "./contact-us.vue";

const meta: Meta<typeof ContactUsPage> = {
	title: "Pages/Contact Us",
	component: ContactUsPage,
	tags: ["autodocs"],
	parameters: {
		layout: "fullscreen",
	},
};

export default meta;
type Story = StoryObj<typeof ContactUsPage>;

export const Default: Story = {
	decorators: [
		() => ({
			template: '<div class="min-h-screen bg-gray-950"><story /></div>',
		}),
	],
};

