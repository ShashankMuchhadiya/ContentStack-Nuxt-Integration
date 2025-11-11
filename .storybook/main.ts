import type { StorybookConfig } from "@storybook-vue/nuxt";

const config: StorybookConfig = {
	stories: ["../stories/**/*.stories.@(js|jsx|ts|tsx|vue)"],

	addons: [],

	framework: {
		name: "@storybook-vue/nuxt",
		options: {
			docgen: "vue-component-meta",
		},
	},
	viteFinal: async config => {
		// Disable proxy to prevent connection errors when Nuxt dev server is not running
		if (config.server) {
			config.server.proxy = undefined;
		}
		
		return config;
	},

	typescript: {
		check: false,
	},
};

export default config;
