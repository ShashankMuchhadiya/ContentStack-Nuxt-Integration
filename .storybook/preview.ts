import type { Preview } from "@storybook/vue3";

const preview: Preview = {
    parameters: {
		actions: { argTypesRegex: "^on[A-Z].*" },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		backgrounds: {
            options: {
                dark: {
					name: "dark",
					value: "#111827",
				},

                light: {
					name: "light",
					value: "#ffffff",
				}
            }
        },
		docs: {
			autodocs: "tag",
			source: {
				type: "code",
			},
		},
	},

    decorators: [
		(story) => ({
			components: { story },
			template: `
				<div class="bg-gray-950 min-h-screen p-8 font-['Poppins',sans-serif]">
					<story />
				</div>
			`,
		}),
	],

    initialGlobals: {
        backgrounds: {
            value: "dark"
        }
    }
};

export default preview;

