import { describe, it, expect, vi, beforeEach } from 'vitest';
import { readFile } from 'node:fs/promises';
import { getArticles, getClassification, getArticleBySlug } from './brite';

vi.mock('node:fs/promises');

const mockArticleAll = {
  all: [
    {
      summary: {
        slug: 'test-article',
        title: 'テスト記事',
        thumbnail: 'https://example.com/img.png',
        category: { name: 'tech', image: 'https://example.com/tech.png', posts: [] },
        tags: [],
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-01-02T00:00:00Z'
      },
      content: '## 内容'
    }
  ]
};

const mockClassification: ArticleClassified[] = [
  { name: 'tech', image: 'https://example.com/tech.png', posts: [] }
];

describe('getArticles', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('正常なファイルから記事一覧を返す', async () => {
    vi.mocked(readFile).mockResolvedValue(JSON.stringify(mockArticleAll) as never);
    const result = await getArticles('blog');
    expect(result).toHaveLength(1);
    expect(result[0].summary.slug).toBe('test-article');
  });

  it('ファイル読み込みが失敗したとき空配列を返す', async () => {
    vi.mocked(readFile).mockRejectedValue(new Error('File not found'));
    const result = await getArticles('blog');
    expect(result).toEqual([]);
  });

  it('portfolio contentType でも動作する', async () => {
    vi.mocked(readFile).mockResolvedValue(JSON.stringify(mockArticleAll) as never);
    const result = await getArticles('portfolio');
    expect(result).toHaveLength(1);
  });
});

describe('getClassification', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('正常なファイルから分類一覧を返す', async () => {
    vi.mocked(readFile).mockResolvedValue(
      JSON.stringify(mockClassification) as never
    );
    const result = await getClassification('blog', 'category');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('tech');
  });

  it('ファイル読み込みが失敗したとき空配列を返す', async () => {
    vi.mocked(readFile).mockRejectedValue(new Error('File not found'));
    const result = await getClassification('blog', 'tag');
    expect(result).toEqual([]);
  });
});

describe('getArticleBySlug', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('slug に一致する記事を返す', async () => {
    vi.mocked(readFile).mockResolvedValue(JSON.stringify(mockArticleAll) as never);
    const result = await getArticleBySlug('blog', 'test-article');
    expect(result.summary.slug).toBe('test-article');
  });
});
