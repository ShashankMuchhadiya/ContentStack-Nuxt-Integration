<script lang="ts" setup>
/**
 * TextImageCarousel Component
 * 
 * A carousel component that displays multiple items with text and images, supporting different image positions from ContentStack.
 * 
 * @component
 */
import type { TextImageCarousel as TextImageCarouselType } from "@/types/contentstack";
import getLinkUrl from "@/utils/getLinkUrl";

interface Props {
	/** Carousel data from ContentStack */
	carousel: TextImageCarouselType;
}

defineProps<Props>();
</script>

<template>
	<div v-if="carousel" class="py-10 lg:py-14 bg-gray-900/50">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<!-- Carousel Container -->
			<div class="relative">
				<!-- Carousel Items -->
				<div v-if="carousel.carousel_items" class="space-y-12">
					<div
						v-for="(item, itemIndex) in carousel.carousel_items"
						:key="`carousel-item-${itemIndex}`"
						class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
						:class="[
							carousel.styles?.image_position === 'left'
								? 'lg:flex-row'
								: 'lg:flex-row-reverse',
						]">
						<!-- Image -->
						<div
							:class="[
								carousel.styles?.image_position === 'left'
									? 'lg:order-1'
									: 'lg:order-2',
							]"
							class="relative">
							<NuxtImg
								v-if="item.image"
								:src="item.image.url"
								:alt="item.image_alt_text || item.image.title || 'Carousel image'"
								class="rounded-2xl shadow-2xl w-full aspect-square object-cover"
								loading="lazy"
								v-bind="item.image.$ && item.image.$.url" />
						</div>

						<!-- Content -->
						<div
							:class="[
								carousel.styles?.image_position === 'left'
									? 'lg:order-2'
									: 'lg:order-1',
								item.styles?.theme === 'light' ? 'text-gray-800' : 'text-white',
							]">
							<h3
								v-if="item.heading"
								class="text-3xl lg:text-4xl font-semibold mb-6 tracking-tight text-white"
								v-bind="item.$ && item.$.heading">
								{{ item.heading }}
							</h3>

							<div
								v-if="item.content"
								class="text-lg lg:text-xl mb-8 text-gray-300 prose prose-lg prose-invert max-w-none whitespace-pre-line leading-relaxed"
								v-html="item.content"
								v-bind="item.$ && item.$.content" />

							<!-- CTA Buttons -->
							<div v-if="item.cta" class="flex flex-wrap gap-4">
								<a
									v-for="(ctaItem, ctaIndex) in item.cta"
									:key="`cta-${ctaIndex}`"
									:href="getLinkUrl(ctaItem.link) || ctaItem.external_url || '#'"
									class="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium bg-white text-gray-900 hover:bg-gray-100 transition-all duration-200 shadow-sm hover:shadow-md"
									v-bind="ctaItem.$ && ctaItem.$.link">
									{{ ctaItem.text }}
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

