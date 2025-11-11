# ContentStack Setup

This guide will help you set up ContentStack for this project.

## Creating a ContentStack Account

1. Go to [contentstack.com](https://www.contentstack.com/)
2. Sign up for a free account
3. Create a new stack

## Required Content Types

Set up the following content types in your ContentStack stack:

### navigation

Used for header navigation.

**Fields:**
- `title` (Single Line Textbox)
- `items` (Modular Blocks) - Navigation items

### menu

Used for footer menu.

**Fields:**
- `sections` (Modular Blocks) - Footer sections

### home_page

Used for homepage content.

**Fields:**
- `components` (Modular Blocks) - Page components
- `seo` (Group) - SEO metadata

### page

Used for dynamic pages.

**Fields:**
- `title` (Single Line Textbox)
- `url` (Single Line Textbox) - Page URL
- `components` (Modular Blocks) - Page components
- `seo` (Group) - SEO metadata

### card_collection

Used for card collection components.

**Fields:**
- `header` (Group) - Collection header
- `cards` (Modular Blocks) - Card items

### teaser

Used for teaser components.

**Fields:**
- `heading` (Single Line Textbox)
- `content` (RTE) - Rich text content
- `image` (File) - Teaser image
- `cta` (Modular Blocks) - Call-to-action buttons

### text_image_carousel

Used for carousel components.

**Fields:**
- `carousel_items` (Modular Blocks) - Carousel items
- `styles` (Group) - Styling options

### featured_articles

Used for featured articles.

**Fields:**
- `articles` (Modular Blocks) - Article items

## Getting API Credentials

1. Go to Settings in your ContentStack stack
2. Navigate to Stack Settings
3. Copy your:
   - API Key
   - Delivery Token
   - Environment name
   - Region

## Setting Up Locales

Configure locales in ContentStack to match your i18n setup:

- `en-us` - English (US)
- `es-es` - Spanish (Spain)
- `fr-fr` - French (France)
- `de-de` - German (Germany)

## Publishing Content

1. Create entries for each content type
2. Publish entries to your environment
3. Ensure URLs match your routing structure

