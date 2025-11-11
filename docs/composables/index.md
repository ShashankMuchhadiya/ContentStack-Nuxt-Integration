# Composables

Composables are reusable functions that provide shared functionality across your application.

## Available Composables

### [useContentStack](./use-content-stack.md)

The main composable for fetching content from ContentStack. It provides caching, error handling, and reactive data.

### [useSEO](./use-seo.md)

A composable for managing SEO meta tags and structured data.

## Usage Pattern

All composables follow Vue 3 Composition API patterns:

```vue
<script setup lang="ts">
const { data, pending, error } = await useContentStack({
  content_type_uid: "page",
  language: "en-us",
  url: "/about",
});
</script>
```

## Auto-import

All composables in the `app/composables/` directory are auto-imported by Nuxt, so you don't need to import them manually.

