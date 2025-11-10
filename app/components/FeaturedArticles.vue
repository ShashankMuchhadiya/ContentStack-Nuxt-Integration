<script lang="ts" setup>
import type { FeaturedArticles as FeaturedArticlesType } from "@/types/contentstack";

interface Props {
	featuredArticles: FeaturedArticlesType;
}

defineProps<Props>();
</script>

<template>
	<section v-if="featuredArticles" class="py-10 lg:py-14 bg-gray-950">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div
				class="text-center mb-16"
				v-bind="featuredArticles.$ && featuredArticles.$.heading">
				<h2
					v-if="featuredArticles.heading"
					class="text-4xl lg:text-5xl font-semibold mb-4 tracking-tight text-white">
					{{ featuredArticles.heading }}
				</h2>
				<p
					v-if="featuredArticles.sub_heading"
					class="text-xl lg:text-2xl text-gray-400 max-w-2xl mx-auto">
					{{ featuredArticles.sub_heading }}
				</p>
			</div>

			<!-- Articles Grid -->
			<div
				v-if="featuredArticles.articles"
				class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
				<div
					v-for="(article, articleIndex) in featuredArticles.articles"
					:key="`article-${articleIndex}`"
					class="group bg-gray-900 rounded-2xl overflow-hidden border border-gray-800/50 hover:border-gray-700 transition-all duration-300 hover:shadow-xl">
					<!-- Article content will be resolved from the article reference -->
					<div class="p-4 lg:p-4">
						<p class="text-sm text-gray-400 mb-2">
							{{ article._content_type_uid }}
						</p>
						<p class="text-white font-medium mb-4">{{ article.uid }}</p>
						<a
							:href="`/article/${article.uid}`"
							class="inline-flex items-center text-sm font-medium text-white hover:text-gray-300 transition-colors group/link">
							Read More
							<svg
								class="ml-1 h-4 w-4 transition-transform group-hover/link:translate-x-1"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 5l7 7-7 7" />
							</svg>
						</a>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

