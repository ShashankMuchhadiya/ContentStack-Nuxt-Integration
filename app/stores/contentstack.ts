import { defineStore } from "pinia";
import type { Ref } from "vue";

interface ContentStackCache {
	[key: string]: {
		data: any;
		timestamp: number;
		language: string;
	};
}

export const useContentStackStore = defineStore("contentstack", {
	state: () => ({
		cache: {} as ContentStackCache,
		pending: {} as Record<string, boolean>,
	}),

	getters: {
		/**
		 * Get cached data for a specific key and language
		 * The cacheKey should already include the language (e.g., "header-navigation-en-us")
		 */
		getCachedData: (state) => (cacheKey: string, language: string) => {
			// Try with the cacheKey as-is first (it might already include language)
			let key = cacheKey;
			let cached = state.cache[key];
			
			// If not found, try with language appended
			if (!cached) {
				key = `${cacheKey}-${language}`;
				cached = state.cache[key];
			}
			
			if (!cached) {
				return null;
			}

			// Check if cache is still valid (24 hours)
			const cacheAge = Date.now() - cached.timestamp;
			const maxAge = 24 * 60 * 60 * 1000; // 24 hours

			if (cacheAge > maxAge) {
				// Cache expired, remove it
				delete state.cache[key];
				return null;
			}

			// Return cached data if language matches
			if (cached.language === language || cached.language === key.split('-').pop()) {
				return cached.data;
			}

			return null;
		},

		/**
		 * Check if data is pending for a specific key
		 */
		isPending: (state) => (cacheKey: string, language: string) => {
			const key = `${cacheKey}-${language}`;
			return state.pending[key] || false;
		},
	},

	actions: {
		/**
		 * Set cached data for a specific key and language
		 * The cacheKey should already include the language (e.g., "header-navigation-en-us")
		 */
		setCachedData(cacheKey: string, language: string, data: any) {
			// Use cacheKey as-is if it already includes language, otherwise append it
			const key = cacheKey.includes(`-${language}`) ? cacheKey : `${cacheKey}-${language}`;
			this.cache[key] = {
				data,
				timestamp: Date.now(),
				language,
			};
		},

		/**
		 * Set pending state for a specific key
		 */
		setPending(cacheKey: string, language: string, pending: boolean) {
			const key = `${cacheKey}-${language}`;
			if (pending) {
				this.pending[key] = true;
			} else {
				delete this.pending[key];
			}
		},

		/**
		 * Clear cached data for a specific key and language
		 */
		clearCache(cacheKey: string, language?: string) {
			if (language) {
				const key = `${cacheKey}-${language}`;
				delete this.cache[key];
				delete this.pending[key];
			} else {
				// Clear all entries for this cache key
				Object.keys(this.cache).forEach((key) => {
					if (key.startsWith(`${cacheKey}-`)) {
						delete this.cache[key];
					}
				});
				Object.keys(this.pending).forEach((key) => {
					if (key.startsWith(`${cacheKey}-`)) {
						delete this.pending[key];
					}
				});
			}
		},

		/**
		 * Clear all cached data
		 */
		clearAllCache() {
			this.cache = {};
			this.pending = {};
		},
	},
});

