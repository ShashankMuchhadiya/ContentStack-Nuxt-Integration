# Getting Started

This guide will help you set up and run the ContentStack Integration project.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **ContentStack Account** with API credentials

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/ShashankMuchhadiya/ContentStack-Nuxt-Integration.git
cd ContentStack-Nuxt-Integration
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
NUXT_CONTENTSTACK_API_KEY=your_api_key
NUXT_CONTENTSTACK_DELIVERY_TOKEN=your_delivery_token
NUXT_CONTENTSTACK_ENVIRONMENT=your_environment
NUXT_CONTENTSTACK_REGION=us
NUXT_CONTENTSTACK_PREVIEW_TOKEN=your_preview_token
NUXT_CONTENTSTACK_PREVIEW=false
NUXT_PUBLIC_SITE_URL=https://your-site.com
```

### 4. Run the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## ContentStack Setup

1. Create a ContentStack account at [contentstack.com](https://www.contentstack.com/)
2. Create a new stack
3. Set up your content types:
   - `navigation` - For header navigation
   - `menu` - For footer menu
   - `home_page` - For homepage content
   - `page` - For dynamic pages
   - `card_collection` - For card collection components
   - `teaser` - For teaser components
   - `text_image_carousel` - For carousel components
   - `featured_articles` - For featured articles
4. Get your API credentials from the Settings page

## Next Steps

- Read about [Components](./components/)
- Learn about [Composables](./composables/)
- Check out the [API Reference](./api/)
- Follow the [Configuration Guide](./guides/configuration.md)

