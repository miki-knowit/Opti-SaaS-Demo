# Optimizely CMS 12 SaaS with a Vue frontend - demo application

Demo application built with Nuxt.js, TypeScript and GraphQL (via Optimizely Graph).

This is first and foremost a PoC, not a finalized production architecture.
This project is intended as a demo application to be used by developers within Knowit Experience, to demonstrate the general functionality of an application using the SaaS version of the Optimizely CMS. Content is fetched with GraphQL as the query language and Nuxt handles the routing & rendering of Vue components.

# Table of Contents

- [Current Limitations](#current-limitations)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Updating CMS Content and Types](#updating-and-adding-new-content-in-the-cms)
- [Data Flow](#data-flow)
- [Project Structure](#project-structure)
- [Global Styling and Overriding Styles](#global-styling-and-overriding-styles)

## Current Limitations

- `CommonPage` currently does not use the shared `PageHeader` component like `StartPage` does. The `/en/om-oss` page renders its header, preamble, image and hero background directly in `OmOss.vue`.
- Some components (e.g. `FooterBlock.vue`) have a lot of scoped styling, which is _not_ desired. It is temporary styling to simulate the Figma sketches.
- Some styling (e.g. flex properties have hard coded height/width values) from Figma have been disregarded to make a responsive design possible...
    - response design is _not_ applied to all pages and components yet.
- Vue router warns that `/en/start` is not found, this is due to the path for the startpage being `/` in Optimizely which does not result in `/en/start` in the Nuxt routing.
- Responsive design needs work, it is not polished.

## Tech Stack

- Nuxt 4
- Vue 3
- TypeScript
- SCSS
- GraphQL

## Prerequisites

- Node.js
- npm
- A license for the SaaS version of Optimizely CMS.

Create a `.env` file with the API-key from CMS. It can be found at:
`Settings -> API Keys -> Delivery Keys -> Address + Single Key`

```env
ENVIRONMENT_VARIABLE_NAME=https://cg.optimizely.com/content/v2?auth=YOUR_SINGLE_KEY
```

## Getting Started

Install dependencies:

```
npm install
```

Run the application:

```
npm run dev
```

By default the app runs on port 3000.

```txt
http://localhost:3000
```

## Updating And Adding New Content In The CMS

When changing or adding content types in the CMS, always make sure Optimizely Graph is synchronized before regenerating frontend types or testing queries.

1. In Optimizely, run:

`Settings -> Data & Sync Management -> Scheduled Jobs -> Start a Optimizely Graph Full Synchronization`

2. Regenerate GraphQL TypeScript types (`/app/graphql/generated.ts`):

```bash
npm run generate:graphql
```

Generated types are written to:

```txt
app/graphql/generated.ts
```

## Data Flow

Vue components do not query Optimizely Graph directly. They fetch data through local Nuxt API routes.

```txt
Vue component
  -> /api/<endpoint>
  -> server/utils/optimizely-graph.ts
  -> Optimizely Graph
```

GraphQL queries and generated TypeScript types live in:

```txt
app/graphql/
```

## Project Structure

```
app/
assets/scss/ Global styling, SCSS
components/ Vue components for CMS pages and blocks respectively
components/utils Helper functions
graphql/ GraphQL documents and generated TypeScript types
pages/ Nuxt route entrypoints

server/
api/ Nuxt server routes used by the frontend
utils/ Shared server-side utilities, including Optimizely Graph access

public/* Public static assets (icons, fonts, images - assets that are not requested from the CMS)
```

## Global Styling and Overriding Styles

Global styling (`app/assets/scss/`) comes from Figma, Styleguide Ramverket ~ spring 2026. When possible, values have been preserved and restructured into the `assets` folder as partials which are then used in `main.scss` or on a component-level (e.g. `breakpoints` in `SectionBlock.vue`).

To reduce repeated component-level styling and stay consistent with the design team's style guide, common HTML elements are mapped globally to predefined styles.

Overriding styles has been done on a component-level to satisfy actual browser-behavior and user preference, but should be considered carefully when modified as to not stray too far from the style guide.

```
<style scoped lang="scss">
{ ... }
</style>
```

For example, `h1` apply the `.heading-xl` style.

```scss
h1,
.heading-xl {
    font-family: var(--font-family-heading);
    font-size: var(--font-size-heading-xl);
    font-weight: var(--font-weight-regular);
    line-height: var(--line-height-heading);
    margin-bottom: var(--margin-bottom-heading-general);
}
```
