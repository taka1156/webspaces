---
name: webspaces
description: >
  Project overview for webspaces (personal blog on Next.js + Cloudflare Pages).
  Use when: you need the tech stack, directory structure, content pipeline
  (brite / Cloudflare R2), key yarn commands, or page routes.
---

# Webspaces Project Overview

## Purpose

Personal blog site built with Next.js and deployed to Cloudflare Pages.

## Tech Stack

| Category          | Technology                      |
| ----------------- | ------------------------------- |
| Framework         | Next.js 16 (App Router)         |
| Language          | TypeScript                      |
| Styling           | vanilla-extract                 |
| Testing           | Vitest, Testing Library         |
| Component Catalog | Storybook                       |
| Deployment        | Cloudflare Pages (via wrangler) |

## Content Management

- Articles are managed in a **private repository** and converted to static JSON by [brite](https://github.com/taka1156/brite), the author's own SSG/CMS tool (dogfooding)
- Generated JSON files are stored in **Cloudflare R2** and fetched at build time
- At build time, `R2_URL` / `R2_BUCKET` env vars specify the R2 endpoint; falls back to `public/` directory for local development

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
    cloudflare/  # Cloudflare-specific utilities (getBaseUrl)
    dayjs/       # Date utilities
scripts/
  sync-r2-assets.mjs  # Sync assets from R2 to public/
```

## Key Commands

```bash
yarn dev          # Start dev server on port 8000
yarn build        # Next.js build
yarn deploy       # Build + deploy to Cloudflare Pages
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
