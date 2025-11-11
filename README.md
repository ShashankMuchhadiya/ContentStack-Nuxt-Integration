# Nuxt ContentStack Integration

A modern, dark-mode-first Nuxt.js application integrated with ContentStack CMS. This project provides a clean, Apple-inspired UI with seamless content management capabilities, multi-language support, and comprehensive component documentation.

## 🚀 Features

- **Modern Dark Mode UI**: Beautiful, minimalist dark theme inspired by Apple.com
- **ContentStack CMS Integration**: Full integration with ContentStack for content management
- **Server-Side Rendering (SSR)**: Optimized for SEO and performance
- **Internationalization (i18n)**: Multi-language support with 4 languages (English, Spanish, French, German)
- **Responsive Design**: Mobile-first responsive layout
- **TypeScript Support**: Full TypeScript support for type safety
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Live Preview Support**: ContentStack Live Preview integration
- **State Management**: Pinia store for efficient data caching and state management
- **Component Documentation**: Storybook integration for component development and documentation
- **VitePress Documentation**: Comprehensive documentation site with guides and API reference
- **Loading States**: Smooth loading indicators for better UX
- **Dynamic Routing**: Support for dynamic page routing with catch-all routes
- **SEO Optimization**: Built-in SEO support with meta tags and structured data
- **Image Optimization**: Nuxt Image module for optimized image delivery

## 🛠️ Tech Stack

- **Framework**: [Nuxt.js](https://nuxt.com/) v4.1.2
- **CMS**: [ContentStack](https://www.contentstack.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Language**: TypeScript
- **State Management**: [Pinia](https://pinia.vuejs.org/)
- **Internationalization**: [@nuxtjs/i18n](https://i18n.nuxtjs.org/)
- **Image Optimization**: [@nuxt/image](https://image.nuxtjs.org/)
- **Component Documentation**: [Storybook](https://storybook.js.org/)
- **Documentation**: [VitePress](https://vitepress.dev/)
- **Package Manager**: npm

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **ContentStack Account** with API credentials

## 🔧 Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/ShashankMuchhadiya/ContentStack-Nuxt-Integration.git
    cd ContentStack-Nuxt-Integration
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Set up environment variables**

    Create a `.env` file in the root directory with the following variables:

    ```env
    NUXT_CONTENTSTACK_API_KEY=your_api_key
    NUXT_CONTENTSTACK_DELIVERY_TOKEN=your_delivery_token
    NUXT_CONTENTSTACK_ENVIRONMENT=your_environment
    NUXT_CONTENTSTACK_REGION=us (or eu, azure-na, azure-eu)
    NUXT_CONTENTSTACK_PREVIEW_TOKEN=your_preview_token (optional)
    NUXT_CONTENTSTACK_PREVIEW=false (set to true for preview mode)
    NUXT_PUBLIC_SITE_URL=https://your-site.com (optional, for SEO)
    ```

4. **Run the development server**

    ```bash
    npm run dev
    ```

    The application will be available at `http://localhost:3000`

## ⚙️ Configuration

### Environment Variables

| Variable                           | Description                                      | Required |
| ---------------------------------- | ------------------------------------------------ | -------- |
| `NUXT_CONTENTSTACK_API_KEY`        | Your ContentStack API Key                        | Yes      |
| `NUXT_CONTENTSTACK_DELIVERY_TOKEN` | ContentStack Delivery Token                      | Yes      |
| `NUXT_CONTENTSTACK_ENVIRONMENT`    | ContentStack Environment                         | Yes      |
| `NUXT_CONTENTSTACK_REGION`         | ContentStack Region (us, eu, azure-na, azure-eu) | Yes      |
| `NUXT_CONTENTSTACK_PREVIEW_TOKEN`  | Preview Token for Live Preview                   | No       |
| `NUXT_CONTENTSTACK_PREVIEW`        | Enable Preview Mode                              | No       |
| `NUXT_PUBLIC_SITE_URL`             | Your site URL for SEO and sitemap                | No       |

### ContentStack Setup

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

### Internationalization (i18n)

The project supports 4 languages by default:

- **English (en)** - Default language
- **Spanish (es)**
- **French (fr)**
- **German (de)**

Language files are located in the `locales/` directory. The language switcher component automatically handles locale changes and updates the URL accordingly.

## 📁 Project Structure

```
ContentStack-Integration/
├── app/
│   ├── components/
│   │   ├── CardCollection.vue      # Card collection component
│   │   ├── EmptyState.vue          # Empty state component
│   │   ├── FeaturedArticles.vue   # Featured articles component
│   │   ├── Footer.vue              # Footer component
│   │   ├── Header.vue              # Navigation header component
│   │   ├── LanguageSwitcher.vue    # Language switcher component
│   │   ├── PageLoader.vue          # Loading spinner component
│   │   ├── Teaser.vue              # Teaser component
│   │   └── TextImageCarousel.vue   # Text-image carousel component
│   ├── composables/
│   │   ├── useContentStack.ts      # ContentStack data fetching composable
│   │   └── useSEO.ts               # SEO composable
│   ├── pages/
│   │   ├── index.vue               # Homepage
│   │   ├── about-us.vue            # About us page
│   │   ├── contact-us.vue         # Contact us page
│   │   └── [...slug].vue           # Dynamic page routes
│   ├── plugins/
│   │   └── contentstack.ts         # ContentStack plugin
│   ├── stores/
│   │   └── contentstack.ts         # Pinia store for caching
│   ├── types/
│   │   ├── contentstack.d.ts       # TypeScript definitions
│   │   ├── contentstack.ts         # ContentStack types
│   │   └── types.ts                # Global types
│   ├── utils/
│   │   ├── contentStackCacheKey.ts # Cache key utilities
│   │   ├── contentStackError.ts    # Error handling
│   │   ├── contentStackQuery.ts    # Query builder
│   │   ├── contentStackSDK.ts     # SDK utilities
│   │   ├── fetchAllEntries.ts      # Fetch all entries
│   │   ├── fetchMultipleEntries.ts # Fetch multiple entries
│   │   ├── fetchSingleEntry.ts     # Fetch single entry
│   │   ├── getLinkUrl.ts           # Link URL resolver
│   │   └── localeMapper.ts         # Locale mapping utilities
│   └── app.vue                     # Root component
├── .storybook/                     # Storybook configuration
│   ├── main.ts                     # Storybook main config
│   └── preview.ts                  # Storybook preview config
├── locales/                        # i18n translation files
│   ├── en-us.json                  # English translations
│   ├── es-es.json                  # Spanish translations
│   ├── fr-fr.json                  # French translations
│   └── de-de.json                 # German translations
├── stories/                        # Storybook stories
│   ├── *.stories.ts                # Component stories
├── docs/                           # VitePress documentation
│   ├── .vitepress/                 # VitePress configuration
│   │   └── config.mjs              # VitePress config file
│   ├── components/                 # Component documentation
│   ├── composables/                 # Composable documentation
│   ├── api/                        # API reference
│   ├── guides/                     # Step-by-step guides
│   ├── index.md                    # Documentation home page
│   └── getting-started.md          # Getting started guide
├── public/                         # Static assets
├── nuxt.config.ts                  # Nuxt configuration
├── package.json                    # Dependencies
├── tsconfig.json                   # TypeScript configuration
└── i18n.config.ts                 # i18n configuration
```

## 🎨 UI Components

### Header Component

- Sticky navigation with glassmorphism effect
- Responsive mobile menu
- Language switcher integration
- Smooth hover animations
- Loading states
- Dynamic navigation from ContentStack

### Footer Component

- Multi-column layout
- Dynamic sections from ContentStack
- Rich text support
- Responsive design

### CardCollection Component

- Grid layout for card collections
- Image support with lazy loading
- CTA buttons
- Responsive columns (1-4 columns)

### Teaser Component

- Text and image layout
- Left/right alignment options
- Video support
- CTA buttons

### TextImageCarousel Component

- Carousel with text and images
- Multiple carousel items
- Left/right image positioning
- Smooth transitions

### FeaturedArticles Component

- Article listing
- Image thumbnails
- Publication dates
- Article links

### LanguageSwitcher Component

- Dropdown language selector
- Automatic URL updates
- Locale persistence

### PageLoader Component

- Loading spinner
- Customizable messages
- Smooth animations

## 🚀 Usage

### Fetching Content

Use the `useContentStack` composable to fetch content:

```vue
<script setup lang="ts">
const { data, pending, error } = await useContentStack({
	content_type_uid: "page",
	language: "en-us",
	url: "/about",
	trigger404: false,
});
</script>
```

### Available Options

- `content_type_uid`: The ContentStack content type UID
- `language`: Locale code (default: "en-us")
- `url`: URL for single entry queries
- `multiple`: Set to `true` for multiple entries
- `trigger404`: Set to `false` to prevent 404 on missing content
- `key`: Custom cache key
- `options`: Additional ContentStack query options

### Using SEO Composable

```vue
<script setup lang="ts">
useSEO({
	title: "Page Title",
	description: "Page description",
	image: "https://example.com/image.jpg",
});
</script>
```

### Language Switching

The language switcher is automatically available in the header. Users can switch languages, and the URL will update accordingly:

- English: `/` or `/en`
- Spanish: `/es`
- French: `/fr`
- German: `/de`

## 📜 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run generate` - Generate static site
- `npm run preview` - Preview production build
- `npm run storybook` - Start Storybook development server
- `npm run build-storybook` - Build Storybook for production
- `npm run docs:dev` - Start VitePress documentation server
- `npm run docs:build` - Build VitePress documentation
- `npm run docs:preview` - Preview built documentation
- `npm run postinstall` - Prepare Nuxt (runs automatically)

## 📚 Storybook

This project includes Storybook for component development and documentation.

### Running Storybook

```bash
npm run storybook
```

Storybook will be available at `http://localhost:6006`

### Building Storybook

```bash
npm run build-storybook
```

### Story Files

All story files are located in the `stories/` directory. Each component has its own story file with multiple variants and documentation.

## 📖 VitePress Documentation

This project includes comprehensive documentation built with VitePress.

### Running Documentation

```bash
npm run docs:dev
```

The documentation will be available at `http://localhost:5173`

### Building Documentation

```bash
npm run docs:build
```

### Previewing Built Documentation

```bash
npm run docs:preview
```

### Documentation Structure

The documentation includes:

- **Getting Started** - Setup and installation guide
- **Components** - Complete component documentation
- **Composables** - Composable functions reference
- **API Reference** - SDK and utilities documentation
- **Guides** - Step-by-step guides for:
    - Configuration
    - ContentStack Setup
    - Internationalization
    - SEO

All documentation files are located in the `docs/` directory.

## 🏗️ Building for Production

1. **Build the application**

    ```bash
    npm run build
    ```

2. **Preview the production build**

    ```bash
    npm run preview
    ```

3. **Generate static site** (if needed)
    ```bash
    npm run generate
    ```

## 🎯 Features in Detail

### Dark Mode Design

- Consistent dark theme throughout
- Smooth transitions and animations
- Modern glassmorphism effects
- Professional color palette

### Content Management

- Dynamic content from ContentStack
- Support for multiple content types
- Rich text rendering
- Image optimization with Nuxt Image
- Caching with Pinia store

### Performance

- Server-side rendering for SEO
- Optimized caching strategies
- Lazy loading support
- Efficient data fetching
- Image optimization

### Internationalization

- Multi-language support
- Automatic locale detection
- URL-based language routing
- Persistent language selection
- Translation file management

## 🔍 SEO Features

- Dynamic meta tags
- Open Graph support
- Twitter Card support
- Structured data
- Sitemap generation
- Robots.txt configuration

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**Shashank Muchhadiya**

- GitHub: [@ShashankMuchhadiya](https://github.com/ShashankMuchhadiya)
- Repository: [ContentStack-Nuxt-Integration](https://github.com/ShashankMuchhadiya/ContentStack-Nuxt-Integration)

## 🙏 Acknowledgments

- [ContentStack](https://www.contentstack.com/) for the amazing CMS
- [Nuxt.js](https://nuxt.com/) team for the excellent framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Storybook](https://storybook.js.org/) for component documentation
- [Pinia](https://pinia.vuejs.org/) for state management

## 📞 Support

For support, please open an issue in the GitHub repository.

---

**Note**: Make sure to set up your ContentStack credentials in the `.env` file before running the application.
