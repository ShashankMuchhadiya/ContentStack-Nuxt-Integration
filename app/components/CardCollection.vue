<script lang="ts" setup>
import type { CardCollection as CardCollectionType } from "@/types/contentstack";
import getLinkUrl from "@/utils/getLinkUrl";

interface Props {
	cardCollection: CardCollectionType;
	index?: number;
	parentData?: Record<string, unknown>;
}

defineProps<Props>();
</script>

<template>
	<div v-if="cardCollection" class="py-10 lg:py-14">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<!-- Header -->
			<div
				v-if="cardCollection.header"
				class="text-center mb-16"
				v-bind="cardCollection.$ && cardCollection.$.header">
				<h2
					v-if="cardCollection.header.heading"
					class="text-5xl lg:text-6xl font-semibold mb-4 tracking-tight text-white"
					v-bind="cardCollection.header.$ && cardCollection.header.$.heading">
					{{ cardCollection.header.heading }}
				</h2>
				<p
					v-if="cardCollection.header.sub_heading"
					class="text-xl lg:text-2xl text-gray-400 max-w-2xl mx-auto"
					v-bind="cardCollection.header.$ && cardCollection.header.$.sub_heading">
					{{ cardCollection.header.sub_heading }}
				</p>
			</div>

			<!-- Cards Grid -->
			<div
				v-if="cardCollection.cards"
				class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
				<div
					v-for="(card, cardIndex) in cardCollection.cards"
					:key="`card-${cardIndex}`"
					class="group bg-gray-900 rounded-2xl overflow-hidden border border-gray-800/50 hover:border-gray-700 transition-all duration-300 hover:shadow-xl"
					v-bind="cardCollection.$ && cardCollection.$[`cards__${cardIndex}`]">
					<!-- Card Image -->
					<div v-if="card.image" class="relative h-56 overflow-hidden bg-gray-800">
						<NuxtImg
							:src="card.image.url"
							:alt="card.image_alt_text || card.image.title || 'Card image'"
							class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
							loading="lazy"
							v-bind="card.image.$ && card.image.$.url" />
					</div>

					<!-- Card Content -->
					<div class="p-4 lg:p-5">
						<h3
							v-if="card.title"
							class="text-xl font-semibold mb-2 text-white"
							v-bind="card.$ && card.$.title">
							{{ card.title }}
						</h3>

						<a
							v-if="card.cta"
							:href="getLinkUrl(card.cta.link)"
							class="inline-flex items-center text-sm font-medium text-white hover:text-gray-300 transition-colors group/link"
							v-bind="card.cta.$ && card.cta.$.link">
							{{ card.cta.text }}
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
	</div>
</template>

