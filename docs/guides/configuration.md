# Configuration

This guide covers all configuration options available in the project.

## Environment Variables

### Required Variables

- `NUXT_CONTENTSTACK_API_KEY` - Your ContentStack API Key
- `NUXT_CONTENTSTACK_DELIVERY_TOKEN` - ContentStack Delivery Token
- `NUXT_CONTENTSTACK_ENVIRONMENT` - ContentStack Environment
- `NUXT_CONTENTSTACK_REGION` - ContentStack Region (us, eu, azure-na, azure-eu)

### Optional Variables

- `NUXT_CONTENTSTACK_PREVIEW_TOKEN` - Preview Token for Live Preview
- `NUXT_CONTENTSTACK_PREVIEW` - Enable Preview Mode (true/false)
- `NUXT_PUBLIC_SITE_URL` - Your site URL for SEO and sitemap

## Nuxt Configuration

The main configuration file is `nuxt.config.ts`. Key modules include:

- `@pinia/nuxt` - State management
- `@nuxtjs/tailwindcss` - CSS framework
- `@nuxtjs/i18n` - Internationalization
- `@nuxt/image` - Image optimization
- `@nuxtjs/storybook` - Component documentation

## i18n Configuration

The project supports 4 languages:
- English (en) - Default
- Spanish (es)
- French (fr)
- German (de)

Language files are located in the `locales/` directory.

## ContentStack Configuration

ContentStack is configured through the plugin in `app/plugins/contentstack.ts`. The plugin initializes:

- ContentStack stack instance
- Live Preview (if enabled)
- Region-specific endpoints

