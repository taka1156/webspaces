# Webspaces

Personal blog site built with Next.js (via [vinext](https://github.com/cloudflare/vinext)) and deployed to Cloudflare Workers as static assets.

[日本語版はこちら](README.ja.md)

## Tech Stack

| Category          | Technology                                         |
| ----------------- | -------------------------------------------------- |
| Framework         | Next.js 16 (App Router) on vinext                  |
| Language          | TypeScript                                         |
| Styling           | vanilla-extract                                    |
| Testing           | Vitest, Testing Library                            |
| Component Catalog | Storybook                                          |
| Deployment        | Cloudflare Workers (static assets, Workers Builds) |

## Content Management

- Articles are managed in a **private repository** and converted to static JSON by [brite](https://github.com/taka1156/brite), the author's own SSG/CMS tool (dogfooding)
- Generated JSON files are stored in **Cloudflare R2** and fetched at build time
- `yarn sync` downloads them into `public/` using `R2_ENDPOINT` / `R2_BUCKET` / `R2_ACCESS_KEY_ID` / `R2_SECRET_ACCESS_KEY` (defaults to a local MinIO at `http://localhost:9000`); pages read them from `public/` at build time
- All pages and OGP images are generated at build time, so the deployed Worker has no server-side code

## Directory Structure

```
src/
  app/           # Next.js App Router pages
  components/
    blog/        # Blog-specific components (article list, pagination, tags, etc.)
    layout/      # Global layout (navbar, navigation, splash, footer)
    profile/     # Profile page components
    shared/      # General-purpose UI components
  constants/     # App-wide constants (BASE_URL, LOGO_TEXT, routes)
  hooks/         # Custom React hooks
  types/         # TypeScript type definitions
  utils/
    ssg/         # Data fetching from R2 (brite.ts)
    marked/      # Markdown rendering (marked + shiki)
    site/        # Site URL utilities (getBaseUrl)
    ogp/         # OGP image path / metadata helpers
    dayjs/       # Date utilities
scripts/
  sync-r2-assets.mjs  # Sync assets from R2 to public/
  generate-ogp.mjs    # Generate OGP images into public/ogp/ (runs before build)
  ogp/                # OGP image renderers
```

## Commands

```bash
yarn dev          # Start dev server on port 3000
yarn build        # Generate OGP images + vinext build (requires yarn sync first)
yarn deploy       # Build + deploy to Cloudflare Workers
yarn sync         # Sync R2 assets to public/
yarn test         # Run Vitest tests
yarn storybook    # Start Storybook on port 8000
yarn lint         # ESLint + Prettier check
yarn format:fix   # Auto-format with Prettier
```

## Pages

| Route            | Description          |
| ---------------- | -------------------- |
| `/`              | Article list (top)   |
| `/article/[id]`  | Article detail       |
| `/categories`    | Category list        |
| `/category/[id]` | Articles by category |
| `/tags`          | Tag list             |
| `/tag/[id]`      | Articles by tag      |
| `/profile`       | Profile page         |
