# useContentStack

The main composable for fetching content from ContentStack. It provides caching, error handling, and reactive data management.

## Usage

```vue
<script setup lang="ts">
const { data, pending, error, refresh } = await useContentStack({
  content_type_uid: "page",
  language: "en-us",
  url: "/about",
  trigger404: false,
});
</script>
```

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `content_type_uid` | `string` | Yes | - | The ContentStack content type UID |
| `language` | `string` | No | `"en-us"` | Locale code for the content |
| `url` | `string` | No | - | URL for single entry queries |
| `multiple` | `boolean` | No | `false` | Set to `true` for multiple entries |
| `trigger404` | `boolean` | No | `true` | Set to `false` to prevent 404 on missing content |
| `key` | `string` | No | - | Custom cache key |
| `options` | `object` | No | - | Additional ContentStack query options |

## Return Value

Returns an object with the following properties:

- `data`: Reactive ref containing the fetched data
- `pending`: Boolean ref indicating if the request is in progress
- `error`: Ref containing any error that occurred
- `refresh`: Function to manually refresh the data

## Examples

### Fetch Single Entry

```vue
<script setup lang="ts">
const { data, pending } = await useContentStack({
  content_type_uid: "page",
  language: "en-us",
  url: "/about",
});
</script>
```

### Fetch Multiple Entries

```vue
<script setup lang="ts">
const { data, pending } = await useContentStack({
  content_type_uid: "page",
  language: "en-us",
  multiple: true,
  options: {
    query: {
      limit: 10,
    },
  },
});
</script>
```

### Custom Cache Key

```vue
<script setup lang="ts">
const { data } = await useContentStack({
  content_type_uid: "page",
  language: "en-us",
  url: "/about",
  key: "custom-cache-key",
});
</script>
```

## Caching

The composable uses Pinia store for caching. Data is cached based on:
- Content type UID
- Language
- URL (for single entries)
- Custom key (if provided)

Cache is automatically invalidated when the language changes.

