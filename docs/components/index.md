# Components

This project includes several reusable Vue components for building the ContentStack integration.

## Available Components

### Layout Components

- **[Header](./header.md)** - Navigation header with language switcher
- **[Footer](./footer.md)** - Footer with dynamic sections

### Content Components

- **[CardCollection](./card-collection.md)** - Grid layout for card collections
- **[Teaser](./teaser.md)** - Text and image teaser component
- **[TextImageCarousel](./text-image-carousel.md)** - Carousel with text and images
- **[FeaturedArticles](./featured-articles.md)** - Featured articles listing

### Utility Components

- **[LanguageSwitcher](./language-switcher.md)** - Language selector dropdown
- **[PageLoader](./page-loader.md)** - Loading spinner component
- **[EmptyState](./empty-state.md)** - Empty state component

## Usage

All components are auto-imported in Nuxt, so you can use them directly in your templates:

```vue
<template>
  <CardCollection :cardCollection="data" />
</template>
```

## Component Props

Each component accepts props from ContentStack content types. Refer to the individual component documentation for detailed prop definitions.

