// common type for tag and category classification
type ArticleClassified = {
  name: string;
  image: string;
  posts: ArticleSummary[];
};

type ArticleSummary = {
  slug: string;
  title: string;
  thumbnail: string;
  description?: string;
  category: ArticleClassified;
  tags: ArticleClassified[];
  created_at: string;
  updated_at: string;
};

type ArticleElement = {
  summary: ArticleSummary;
  content: string;
};
