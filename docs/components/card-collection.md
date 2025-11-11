# CardCollection Component

A card collection component that displays a grid of cards with images, titles, and CTAs from ContentStack.

## Usage

```vue
<template>
  <CardCollection :cardCollection="cardCollectionData" />
</template>

<script setup lang="ts">
import type { CardCollection } from "@/types/contentstack";

const cardCollectionData: CardCollection = {
  header: {
    heading: "Featured Products",
    sub_heading: "Discover our latest collection",
  },
  cards: [
    {
      title: "Product 1",
      image: {
        url: "https://example.com/image.jpg",
        title: "Product 1",
      },
      image_alt_text: "Product 1 image",
      cta: {
        text: "Learn More",
        link: [
          {
            _content_type_uid: "page",
            uid: "product-1",
          },
        ],
      },
    },
  ],
};
</script>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `cardCollection` | `CardCollection` | Yes | Card collection data from ContentStack |

## Features

- Responsive grid layout (1-4 columns)
- Image lazy loading
- Hover effects
- CTA buttons with link resolution
- Dynamic header with heading and sub-heading

## Styling

The component uses Tailwind CSS classes and follows the dark mode theme. Cards have:
- Rounded corners
- Border effects
- Hover animations
- Responsive spacing

