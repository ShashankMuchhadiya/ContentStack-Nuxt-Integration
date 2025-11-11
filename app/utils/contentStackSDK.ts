import contentstack from "@contentstack/delivery-sdk";

export default async () => {
	try {
		// Utilize Nuxt runtime config
		let config;
		try {
			config = useRuntimeConfig();
		} catch (error) {
			// If we can't access runtime config, return null
			console.warn("Cannot access runtime config, ContentStack SDK not initialized");
			return null;
		}

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
			// If ContentStack configuration values are missing, return null instead of throwing
			console.warn("ContentStack configuration values are invalid or missing.");
			return null;
		}
	} catch (error: unknown) {
		console.error("Error initializing ContentStack SDK:", error);
		return null;
	}
};
