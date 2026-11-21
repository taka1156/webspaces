type CommonImg = {
  src: string;
  alt: string;
};

type BlogSnsIcon = {
  name: string;
  img: string;
  link: string;
  /** 単色ロゴの場合 true。文字色で描画し、ライト/ダークモードに追従させる */
  monochrome?: boolean;
};

type BlogSnsIcons = BlogSnsIcon[];

type GetArticles = {
  contents: CommonArticles;
  totalCount: number;
};

type BlogProfile = {
  img: string;
  introduce: string;
};

type BlogGitHubStatus = {
  statusUrl: string;
  usedLangUrl: string;
  /** ダークモード用の statusUrl */
  darkStatusUrl: string;
  /** ダークモード用の usedLangUrl */
  darkUsedLangUrl: string;
  imgAlt: string;
};

type RouteItem = {
  name: string;
  href: string;
  img: string;
};

type RouteItems = RouteItem[];

type TocItem = {
  index: number;
  anchor: string;
  escapedText: string;
};

type TocItems = TocItem[];

type CommonBadge = {
  image: string;
  name: string;
};

type CommonBadges = CommonBadge[];

type CommonArticle = {
  id: string;
  title: string;
  summary: string;
  category: CommonBadge;
  tags: CommonBadges;
  // related_blogs: CommonRelatedArticles;
  createdAt: string;
  updatedAt: string;
};

type CommonArticles = CommonArticle[];

type CommonClassificationItem = ArticleClassified;

type CommonClassificationItems = CommonClassificationItem[];

type CommonRelatedArticles = CommonArticles;
