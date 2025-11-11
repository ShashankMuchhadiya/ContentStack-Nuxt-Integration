# TextImageCarousel Component

A carousel component that displays multiple items with text and images, supporting different image positions from ContentStack.

## Usage

```vue
<template>
  <TextImageCarousel :carousel="carouselData" />
</template>

<script setup lang="ts">
import type { TextImageCarousel } from "@/types/contentstack";

const carouselData: TextImageCarousel = {
  styles: {
    image_position: "left",
  },
  carousel_items: [
    {
      heading: "Feature One",
      content: "<p>Feature description...</p>",
      image: {
        url: "https://example.com/image.jpg",
        title: "Feature Image",
      },
    },
  ],
};
</script>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `carousel` | `TextImageCarousel` | Yes | Carousel data from ContentStack |

## Features

- Multiple carousel items
- Left/right image positioning
- Smooth transitions
- CTA buttons
- Rich text content

