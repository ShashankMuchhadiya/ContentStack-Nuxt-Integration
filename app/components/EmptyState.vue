<script lang="ts" setup>
/**
 * EmptyState Component
 * 
 * A component that displays an empty state message when no data is available.
 * 
 * @component
 */
interface Props {
	/** Title text to display */
	title?: string;
	/** Message text to display */
	message?: string;
}

defineProps<Props>();
</script>

<template>
	<div class="flex items-center justify-center min-h-[60vh]">
		<div class="text-center">
			<h1 v-if="title" class="text-4xl font-semibold text-white mb-4 tracking-tight">
				{{ title }}
			</h1>
			<p v-if="message" class="text-gray-400">{{ message }}</p>
		</div>
	</div>
</template>

