# Webspaces

Next.js（[vinext](https://github.com/cloudflare/vinext) 経由）で構築し、Cloudflare Workers に静的アセットとしてデプロイした個人ブログサイトです。

[English version](README.md)

## 技術スタック

| カテゴリ               | 技術                                               |
| ---------------------- | -------------------------------------------------- |
| フレームワーク         | Next.js 16 (App Router) on vinext                  |
| 言語                   | TypeScript                                         |
| スタイリング           | vanilla-extract                                    |
| テスト                 | Vitest, Testing Library                            |
| コンポーネントカタログ | Storybook                                          |
| デプロイ               | Cloudflare Workers（静的アセット、Workers Builds） |

## コンテンツ管理

- 記事は**プライベートリポジトリ**で管理し、作者自身が開発した SSG/CMS ツール [brite](https://github.com/taka1156/brite)（ドッグフーディング）で静的 JSON に変換
- 生成した JSON ファイルは **Cloudflare R2** に保存され、ビルド時に取得される
- `pnpm sync` が環境変数 `R2_ENDPOINT` / `R2_BUCKET` / `R2_ACCESS_KEY_ID` / `R2_SECRET_ACCESS_KEY` を使って `public/` にダウンロードし（未設定時はローカルの MinIO `http://localhost:9000`）、各ページはビルド時に `public/` から読み込む
- 全ページと OGP 画像をビルド時に生成するため、デプロイされる Worker にサーバー処理はない

## ディレクトリ構成

```
src/
  app/           # Next.js App Router ページ
  components/
    blog/        # ブログ固有のコンポーネント（記事一覧・ページネーション・タグなど）
    layout/      # グローバルレイアウト（ナビバー・ナビゲーション・スプラッシュ・フッター）
    profile/     # プロフィールページのコンポーネント
    shared/      # 汎用 UI コンポーネント
  constants/     # アプリ共通の定数（BASE_URL, LOGO_TEXT, ルートなど）
  hooks/         # カスタム React フック
  types/         # TypeScript 型定義
  utils/
    ssg/         # R2 からのデータ取得 (brite.ts)
    marked/      # Markdown レンダリング (marked + shiki)
    site/        # サイト URL のユーティリティ (getBaseUrl)
    ogp/         # OGP 画像のパス・メタデータ生成
    dayjs/       # 日付ユーティリティ
scripts/
  sync-r2-assets.mjs  # R2 からアセットを public/ に同期
  generate-ogp.mjs    # OGP 画像を public/ogp/ に生成（ビルド前に実行）
  ogp/                # OGP 画像の描画処理
```

## コマンド

```bash
pnpm dev          # 開発サーバー起動（ポート 3000）
pnpm build        # OGP 画像生成 + vinext ビルド（事前に pnpm sync が必要）
pnpm deploy       # ビルド + Cloudflare Workers デプロイ
pnpm sync         # R2 アセットを public/ に同期
pnpm test         # Vitest テスト実行
pnpm storybook    # Storybook 起動（ポート 8000）
pnpm lint         # ESLint + Prettier チェック
pnpm format:fix   # Prettier による自動フォーマット
```

## ページ一覧

| ルート           | 説明               |
| ---------------- | ------------------ |
| `/`              | 記事一覧（トップ） |
| `/article/[id]`  | 記事詳細           |
| `/categories`    | カテゴリ一覧       |
| `/category/[id]` | カテゴリ別記事     |
| `/tags`          | タグ一覧           |
| `/tag/[id]`      | タグ別記事         |
| `/profile`       | プロフィール       |
