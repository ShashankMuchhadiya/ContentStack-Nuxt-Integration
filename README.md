# Contentstack Kickstart: NuxtJS SSR

Contentstack Kickstarts are the minimum amount of code needed to connect to Contentstack.
This kickstart covers the following items:

-   SDK initialization
-   Live preview and Visual building setup
-   Homepage with Contentstack Compass Starter components
-   Dynamic page routing

> This example has Contentstack Live preview set up with SSR mode turnt on. Which means Contentstack adds query parameters to the URL which we grab in the code and give to the Live Preview SDK intance. Contentstack refreshes the browser on content edit each time.

More details about this codebase can be found on the [Contentstack docs](https://www.contentstack.com/docs/developers).

[![Join us on Discord](https://img.shields.io/badge/Join%20Our%20Discord-7289da.svg?style=flat&logo=discord&logoColor=%23fff)](https://community.contentstack.com)

## How to get started

Before you can run this code, you will need a Contentstack "Stack" to connect to.
Follow the following steps to seed a Stack that this codebase understands.

> If you installed this Kickstart via the Contentstack Markertplace or the new account onboarding, you can skip this step.

### Install the CLI

```bash
npm install -g @contentstack/cli
```

#### Using the CLI for the first time?

It might ask you to set your default region.
You can get all regions and their codes [here](https://www.contentstack.com/docs/developers/cli/configure-regions-in-the-cli) or run `csdx config:get:region`.

> Beware, Free Contentstack developer accounts are bound to the EU region. We still use the CDN the API is lightning fast.

Set your region like so:

```bash
csdx config:set:region EU
```

### Log in via the CLI

```bash
csdx auth:login
```

### Get your organization UID

In your Contentstack Organization dashboard find `Org admin` and copy your Organization ID (Example: `blt481c598b0d8352d9`).

### Create a new stack

Make sure to replace `<YOUR_ORG_ID>` with your actual Organization ID and run the below.

```bash
csdx cm:stacks:seed --repo "contentstack/kickstart-stack-seed" --org "<YOUR_ORG_ID>" -n "Kickstart Stack"
```

## Create a new delivery token.

Go to `Settings > Tokens` and create a delivery token. Select the `preview` scope and turn on `Create preview token`

## Fill out your .env file.

Now that you have a delivery token, you can fill out the .env file in your codebase.

> You can find the API key, Delivery Token and Preview Token in Settings > Tokens > Your token.

```
NUXT_CONTENTSTACK_API_KEY=<YOUR_API_KEY>
NUXT_CONTENTSTACK_DELIVERY_TOKEN=<YOUR_DELIVERY_TOKEN>
NUXT_CONTENTSTACK_PREVIEW_TOKEN=<YOUR_PREVIEW_TOKEN>
NUXT_CONTENTSTACK_REGION=EU
NUXT_CONTENTSTACK_ENVIRONMENT=preview
NUXT_CONTENTSTACK_PREVIEW=true
```

## Turn on Live Preview

Go to Settings > Live Preview. Click enable and select the `Preview` environment in the drop down. Hit save.

## Install the dependencies

```bash
npm install
```

### Run your app

```bash
npm run dev
```

### See your page visually

### In the browser

Go to `http://localhost:3000`.

#### In the CMS

Go to Entries and select the only entry in the list.
In the sidebar, click on the live preview icon.
Or, see your entry in the visual builder

## Application Structure

This kickstart now includes a complete homepage implementation using Contentstack's Compass Starter stack data:

### Pages

-   **Homepage (`/`)** - Displays content from the `home_page` content type, supporting various components:

    -   Hero sections with images and CTAs
    -   Feature sections with buckets (cards/grid layout)
    -   Blog sections with featured posts
    -   Embed sections for videos and other content
    -   HTML content sections

-   **Dynamic Pages (`/[...slug]`)** - Handles all other pages using the `page` content type with support for:
    -   Rich text content
    -   Images
    -   Modular blocks with image layouts

### Composables

-   **`useContentStack`** - Primary composable for fetching data from Contentstack
    -   Supports single and multiple entry types
    -   Automatic caching with Nuxt's `useAsyncData`
    -   Query options support (limit, skip, only, except, etc.)
    -   URL-based routing for pages
    -   Language/locale support

### Utilities

The project includes a comprehensive set of utility functions:

-   **`contentStackSDK`** - Initializes and returns a ContentStack stack instance
-   **`contentStackQuery`** - Creates ContentStack SDK query objects
-   **`contentStackCacheKey`** - Generates unique cache keys for queries
-   **`contentStackError`** - Error handling and Nuxt error page rendering
-   **`fetchSingleEntry`** - Fetches a single entry from ContentStack
-   **`fetchMultipleEntries`** - Fetches multiple entries with pagination
-   **`fetchAllEntries`** - Fetches all entries with automatic pagination

All utilities support:

-   Type safety with TypeScript
-   SSR data fetching
-   Error handling
-   Caching

### Content Types

Make sure your Contentstack stack includes:

-   `home_page` content type (from Compass Starter)
-   `page` content type for other pages
