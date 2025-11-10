<script lang="ts" setup>
import type { Teaser as TeaserType } from "@/types/contentstack";
import getLinkUrl from "@/utils/getLinkUrl";

interface Props {
	teaser: TeaserType;
}

defineProps<Props>();
</script>

<template>
	<div
		v-if="teaser"
		class="py-10 lg:py-14"
		:class="[teaser.styles?.text_align === 'Left' ? 'bg-gray-900/50' : 'bg-gray-950']">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div
				class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
				:class="[teaser.styles?.text_align === 'Right' ? 'lg:flex-row-reverse' : '']">
				<!-- Text Content -->
				<div
					class="space-y-6"
					:class="[teaser.styles?.text_align === 'Right' ? 'lg:order-2' : '']">
					<h2
						v-if="teaser.heading"
						class="text-4xl lg:text-5xl font-semibold mb-6 tracking-tight text-white"
						v-bind="teaser.$ && teaser.$.heading">
						{{ teaser.heading }}
					</h2>

					<div
						v-if="teaser.content"
						class="text-lg lg:text-xl text-gray-300 prose prose-lg prose-invert max-w-none leading-relaxed"
						v-html="teaser.content"
						v-bind="teaser.$ && teaser.$.content" />

					<!-- CTA Buttons -->
					<div v-if="teaser.cta" class="flex flex-wrap gap-4 pt-6">
						<a
							v-for="(ctaItem, ctaIndex) in teaser.cta"
							:key="`cta-${ctaIndex}`"
							:href="getLinkUrl(ctaItem.link) || ctaItem.external_url || '#'"
							class="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium bg-white text-gray-900 hover:bg-gray-100 transition-all duration-200 shadow-sm hover:shadow-md"
							v-bind="ctaItem.$ && ctaItem.$.link">
							{{ ctaItem.text }}
						</a>
					</div>
				</div>

				<!-- Image/Video -->
				<div :class="[teaser.styles?.text_align === 'Right' ? 'lg:order-1' : '']">
					<!-- Image -->
					<div
						v-if="teaser.image && teaser.image.length > 0"
						class="relative">
						<NuxtImg
							v-for="(imgItem, imgIndex) in teaser.image"
							:key="`img-${imgIndex}`"
							:src="imgItem.image?.url"
							:alt="imgItem.image_alt_text || imgItem.image?.title || 'Teaser image'"
							class="rounded-2xl shadow-2xl aspect-square object-cover"
							loading="lazy"
							v-bind="imgItem.image?.$ && imgItem.image.$.url" />
					</div>

					<!-- Video -->
					<div
						v-if="teaser.video && teaser.video.video && teaser.video.video.url">
						<video
							:src="teaser.video.video.url"
							:alt="teaser.video.video_alt_text"
							controls
							class="rounded-2xl shadow-2xl w-full"
							v-bind="teaser.video.video.$ && teaser.video.video.$.url" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

