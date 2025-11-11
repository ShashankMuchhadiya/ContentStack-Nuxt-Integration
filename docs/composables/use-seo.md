# useSEO

A composable for managing SEO meta tags and structured data.

## Usage

```vue
<script setup lang="ts">
useSEO({
  title: "Page Title",
  description: "Page description",
  image: "https://example.com/image.jpg",
  url: "https://example.com/page",
});
</script>
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `title` | `string` | No | Page title |
| `description` | `string` | No | Page description |
| `image` | `string` | No | Open Graph image URL |
| `url` | `string` | No | Canonical URL |
| `type` | `string` | No | Open Graph type (default: "website") |
| `siteName` | `string` | No | Site name |
| `publishedTime` | `string` | No | Publication date (ISO 8601) |
| `modifiedTime` | `string` | No | Last modified date (ISO 8601) |

## Features

- Automatic meta tag generation
- Open Graph support
- Twitter Card support
- Structured data (JSON-LD)
- Canonical URL management

## Examples

### Basic Usage

```vue
<script setup lang="ts">
useSEO({
  title: "About Us",
  description: "Learn more about our company",
});
</script>
```

### With Open Graph

```vue
<script setup lang="ts">
useSEO({
  title: "Article Title",
  description: "Article description",
  image: "https://example.com/article-image.jpg",
  url: "https://example.com/article",
  type: "article",
  publishedTime: "2024-01-01T00:00:00Z",
});
</script>
```

