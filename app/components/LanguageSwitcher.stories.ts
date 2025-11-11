import type { Meta, StoryObj } from "@storybook/vue3";
import LanguageSwitcher from "./LanguageSwitcher.vue";

const meta: Meta<typeof LanguageSwitcher> = {
	title: "Components/LanguageSwitcher",
	component: LanguageSwitcher,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: "A language switcher dropdown component that allows users to change the site language.",
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof LanguageSwitcher>;

export const Default: Story = {};

