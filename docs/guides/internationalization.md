# Internationalization

This project includes comprehensive internationalization (i18n) support with 4 languages.

## Supported Languages

- **English (en)** - Default language
- **Spanish (es)**
- **French (fr)**
- **German (de)**

## Configuration

i18n is configured in `nuxt.config.ts` using `@nuxtjs/i18n`. The configuration includes:

- Language detection from browser
- Cookie-based language persistence
- URL-based language routing
- Lazy loading of translation files

## Language Files

Translation files are located in the `locales/` directory:

- `en-us.json` - English translations
- `es-es.json` - Spanish translations
- `fr-fr.json` - French translations
- `de-de.json` - German translations

## URL Structure

The project uses `prefix_except_default` strategy:

- English: `/` or `/en`
- Spanish: `/es`
- French: `/fr`
- German: `/de`

## Using Translations

### In Templates

```vue
<template>
  <h1>{{ $t('welcome.title') }}</h1>
</template>
```

### In Scripts

```vue
<script setup lang="ts">
const { t } = useI18n();
const title = t('welcome.title');
</script>
```

## Language Switcher

The `LanguageSwitcher` component is available in the header and allows users to switch languages. It automatically:

- Updates the URL
- Persists the selection in cookies
- Refreshes content for the new language

## ContentStack Locale Mapping

ContentStack locales are mapped to i18n locales:

- `en` → `en-us`
- `es` → `es-es`
- `fr` → `fr-fr`
- `de` → `de-de`

This mapping is handled automatically by the `localeMapper` utility.

