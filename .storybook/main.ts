import type { StorybookConfig } from "@storybook-vue/nuxt";

const config: StorybookConfig = {
	stories: [
		"../app/components/**/*.stories.@(js|jsx|ts|tsx|vue)",
		"../app/pages/**/*.stories.@(js|jsx|ts|tsx|vue)",
	],
	addons: [],
	framework: {
		name: "@storybook-vue/nuxt",
		options: {},
	},
	typescript: {
		check: false,
	},
	docs: {
		autodocs: true,
	},
};

export default config;

