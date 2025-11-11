# Teaser Component

A teaser component that displays content with images or videos, supporting left/right alignment from ContentStack.

## Usage

```vue
<template>
  <Teaser :teaser="teaserData" />
</template>

<script setup lang="ts">
import type { Teaser } from "@/types/contentstack";

const teaserData: Teaser = {
  heading: "Welcome to Our Platform",
  content: "<p>Discover amazing features...</p>",
  styles: {
    text_align: "Left",
  },
  image: [
    {
      image: {
        url: "https://example.com/image.jpg",
        title: "Teaser Image",
      },
      image_alt_text: "Platform overview",
    },
  ],
};
</script>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `teaser` | `Teaser` | Yes | Teaser data from ContentStack |

## Features

- Text and image layout
- Left/right alignment options
- Video support
- CTA buttons
- Rich text content

