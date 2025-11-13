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
		
		// Fix Storybook file resolution to prevent /_nuxt/app.vue errors
		if (config.resolve) {
			config.resolve.alias = {
				...config.resolve.alias,
			};
		}
		
		// Suppress Storybook file path errors
		if (config.plugins) {
			config.plugins = config.plugins.filter(
				(plugin: any) => !(plugin && plugin.name && plugin.name.includes("vite-plugin-inspect"))
			);
		}
		
		return config;
	},

	typescript: {
		check: false,
	},
};

export default config;
