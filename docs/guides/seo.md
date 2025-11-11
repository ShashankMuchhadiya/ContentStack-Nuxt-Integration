# SEO Guide

This project includes comprehensive SEO features for optimal search engine visibility.

## Features

- Dynamic meta tags
- Open Graph support
- Twitter Card support
- Structured data (JSON-LD)
- Sitemap generation
- Robots.txt configuration

## Using the SEO Composable

The `useSEO` composable makes it easy to set SEO metadata:

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

## Meta Tags

The composable automatically generates:

- `<title>` tag
- `<meta name="description">`
- Open Graph tags (`og:title`, `og:description`, `og:image`, etc.)
- Twitter Card tags
- Canonical URL

## Structured Data

Structured data is automatically added for:

- Organization
- WebSite
- WebPage
- Article (when applicable)

## Sitemap

The sitemap is automatically generated using `@nuxtjs/sitemap`. It includes:

- All pages
- Language variants
- Last modified dates
- Priority settings

## Robots.txt

Robots.txt is configured using `@nuxtjs/robots` and includes:

- Allow/disallow rules
- Sitemap reference
- Crawl-delay settings

## Best Practices

1. Always set a unique title and description for each page
2. Use high-quality images for Open Graph (1200x630px recommended)
3. Set canonical URLs to avoid duplicate content
4. Use structured data for rich snippets
5. Keep meta descriptions under 160 characters

