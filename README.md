# Nuxt ContentStack Integration

A modern, dark-mode-first Nuxt.js application integrated with ContentStack CMS. This project provides a clean, Apple-inspired UI with seamless content management capabilities.

## 🚀 Features

-   **Modern Dark Mode UI**: Beautiful, minimalist dark theme inspired by Apple.com
-   **ContentStack CMS Integration**: Full integration with ContentStack for content management
-   **Server-Side Rendering (SSR)**: Optimized for SEO and performance
-   **Responsive Design**: Mobile-first responsive layout
-   **TypeScript Support**: Full TypeScript support for type safety
-   **Tailwind CSS**: Utility-first CSS framework for rapid UI development
-   **Live Preview Support**: ContentStack Live Preview integration
-   **Loading States**: Smooth loading indicators for better UX
-   **Dynamic Routing**: Support for dynamic page routing with catch-all routes

## 🛠️ Tech Stack

-   **Framework**: [Nuxt.js](https://nuxt.com/) v4.1.2
-   **CMS**: [ContentStack](https://www.contentstack.com/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Language**: TypeScript
-   **Package Manager**: npm

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

-   **Node.js** (v18 or higher)
-   **npm** or **yarn**
-   **ContentStack Account** with API credentials

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

### ContentStack Setup

1. Create a ContentStack account at [contentstack.com](https://www.contentstack.com/)
2. Create a new stack
3. Set up your content types:
    - `navigation` - For header navigation
    - `menu` - For footer menu
    - `home_page` - For homepage content
    - `page` - For dynamic pages
4. Get your API credentials from the Settings page

## 📁 Project Structure

```
ContentStack-Integration/
├── app/
│   ├── components/
│   │   ├── Header.vue          # Navigation header component
│   │   └── Footer.vue           # Footer component
│   ├── composables/
│   │   └── useContentStack.ts   # ContentStack data fetching composable
│   ├── pages/
│   │   ├── index.vue            # Homepage
│   │   └── [...slug].vue        # Dynamic page routes
│   ├── plugins/
│   │   └── contentstack.ts      # ContentStack plugin
│   ├── types/
│   │   └── contentstack.d.ts    # TypeScript definitions
│   ├── utils/
│   │   ├── contentStackCacheKey.ts
│   │   ├── contentStackError.ts
│   │   ├── contentStackQuery.ts
│   │   ├── contentStackSDK.ts
│   │   ├── fetchAllEntries.ts
│   │   ├── fetchMultipleEntries.ts
│   │   └── fetchSingleEntry.ts
│   └── app.vue                  # Root component
├── public/                      # Static assets
├── nuxt.config.ts               # Nuxt configuration
├── package.json                 # Dependencies
├── tsconfig.json                # TypeScript configuration
└── types.ts                     # Global types
```

## 🎨 UI Components

### Header Component

-   Sticky navigation with glassmorphism effect
-   Responsive mobile menu
-   Smooth hover animations
-   Loading states

### Footer Component

-   Multi-column layout
-   Dynamic sections from ContentStack
-   Rich text support

### Pages

-   **Homepage** (`index.vue`): Displays homepage content with components
-   **Dynamic Pages** (`[...slug].vue`): Handles all dynamic routes

## 🚀 Usage

### Fetching Content

Use the `useContentStack` composable to fetch content:

```vue
<script setup>
const { data, pending } = await useContentStack({
	content_type_uid: "page",
	language: "en-us",
	url: "/about",
	trigger404: false,
});
</script>
```

### Available Options

-   `content_type_uid`: The ContentStack content type UID
-   `language`: Locale code (default: "en-us")
-   `url`: URL for single entry queries
-   `multiple`: Set to `true` for multiple entries
-   `trigger404`: Set to `false` to prevent 404 on missing content
-   `key`: Custom cache key
-   `options`: Additional ContentStack query options

## 📜 Scripts

-   `npm run dev` - Start development server
-   `npm run build` - Build for production
-   `npm run generate` - Generate static site
-   `npm run preview` - Preview production build
-   `npm run postinstall` - Prepare Nuxt (runs automatically)

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

-   Consistent dark theme throughout
-   Smooth transitions and animations
-   Modern glassmorphism effects
-   Professional color palette

### Content Management

-   Dynamic content from ContentStack
-   Support for multiple content types
-   Rich text rendering
-   Image optimization

### Performance

-   Server-side rendering for SEO
-   Optimized caching strategies
-   Lazy loading support
-   Efficient data fetching

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

-   GitHub: [@ShashankMuchhadiya](https://github.com/ShashankMuchhadiya)
-   Repository: [ContentStack-Nuxt-Integration](https://github.com/ShashankMuchhadiya/ContentStack-Nuxt-Integration)

## 🙏 Acknowledgments

-   [ContentStack](https://www.contentstack.com/) for the amazing CMS
-   [Nuxt.js](https://nuxt.com/) team for the excellent framework
-   [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

## 📞 Support

For support, please open an issue in the GitHub repository.

---

**Note**: Make sure to set up your ContentStack credentials in the `.env` file before running the application.
