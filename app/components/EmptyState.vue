<script lang="ts" setup>
defineProps<{
	title?: string;
	message?: string;
}>();
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

