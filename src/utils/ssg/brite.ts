import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

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
  return data?.all ?? [];
};

export const getClassification = async (
  contentType: keyof typeof CONTENT_PATHS,
  jsonKey: classification
): Promise<ArticleClassified[]> => {
  const data = await getArticle<ArticleClassified[]>(contentType, jsonKey);
  return data ?? [];
};
