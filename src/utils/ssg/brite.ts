import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { getImageTone } from './imageTone';

const CONTENT_PATHS = {
  blog: 'blog/contents',
  portfolio: 'portfolio/contents'
} as const;

const JSON_PATTERN = {
  all: 'all.json',
  category: 'category.json',
  tag: 'tag.json'
} as const;

const getArticle = async <T>(
  contentType: keyof typeof CONTENT_PATHS,
  jsonKey: keyof typeof JSON_PATTERN
): Promise<T | undefined> => {
  try {
    const localPath = join(
      process.cwd(),
      'public',
      CONTENT_PATHS[contentType],
      JSON_PATTERN[jsonKey]
    );
    return JSON.parse(await readFile(localPath, 'utf-8')) as T;
  } catch {
    return undefined;
  }
};

type classification = 'category' | 'tag';

// 画像のトーン（黒系の単色かどうか）を付与する
const withImageTone = async <T extends { image: string }>(
  item: T
): Promise<T & { imageTone: ImageTone }> => ({
  ...item,
  imageTone: await getImageTone(item.image)
});

const withSummaryImageTone = async (
  summary: ArticleSummary
): Promise<ArticleSummary> => ({
  ...summary,
  category: await withImageTone(summary.category),
  tags: await Promise.all(summary.tags.map(withImageTone))
});

export const getArticleBySlug = async (
  contentType: keyof typeof CONTENT_PATHS,
  slug: string
): Promise<ArticleElement> => {
  const articles = await getArticles(contentType);
  const filteredArticles = articles.filter(
    (article) => article.summary.slug === slug
  );
  return filteredArticles[0];
};

export const getArticles = async (
  contentType: keyof typeof CONTENT_PATHS
): Promise<ArticleElement[]> => {
  const data = await getArticle<{ all: ArticleElement[] }>(contentType, 'all');
  return Promise.all(
    (data?.all ?? []).map(async (article) => ({
      ...article,
      summary: await withSummaryImageTone(article.summary)
    }))
  );
};

export const getClassification = async (
  contentType: keyof typeof CONTENT_PATHS,
  jsonKey: classification
): Promise<ArticleClassified[]> => {
  const data = await getArticle<ArticleClassified[]>(contentType, jsonKey);
  return Promise.all(
    (data ?? []).map(async (item) => ({
      ...(await withImageTone(item)),
      posts: await Promise.all(item.posts.map(withSummaryImageTone))
    }))
  );
};
