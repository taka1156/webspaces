/**
 * 画像のトーン（ビルド時に src/utils/ssg/imageTone.ts で判定）
 * - mono: 黒系の単色画像（文字色で塗って描画する）
 * - color: それ以外（そのまま描画し、ダークモードでは下地を敷く）
 */
type ImageTone = 'mono' | 'color';

// common type for tag and category classification
type ArticleClassified = {
  name: string;
  image: string;
  /** brite のJSONには含まれず、ビルド時に付与される */
  imageTone?: ImageTone;
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
