<template>
	<div class="min-h-screen flex flex-col bg-gray-950 text-gray-100 antialiased">
		<Header />
		<main class="flex-grow">
			<NuxtPage />
		</main>
		<Footer />
	</div>
</template>

<style>
	* {
		font-family: "Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif;
	}
</style>
