import contentstack from "@contentstack/delivery-sdk";

export default async () => {
	try {
		// Utilize Nuxt runtime config
		const config = useRuntimeConfig();

		// Type-safe config access
		const csConfig = config.public.contentstack as {
			APIKEY?: string;
			DELIVERYTOKEN?: string;
			ENVIRONMENT?: string;
		};

		// Check that all required settings are present in the Nuxt runtime config
		if (csConfig?.APIKEY && csConfig?.DELIVERYTOKEN && csConfig?.ENVIRONMENT) {
			// Returns a ContentStack instance for executing API calls
			return contentstack.stack({
				apiKey: csConfig.APIKEY,
				deliveryToken: csConfig.DELIVERYTOKEN,
				environment: csConfig.ENVIRONMENT,
			});
		} else {
			// If ContentStack configuration values are missing, throw an error.
			contentStackError({
				status: 500,
				error_message: "ContentStack configuration values are invalid or missing.",
			});
		}
	} catch (error: unknown) {
		contentStackError(error as ContentStackError);
	}
};
