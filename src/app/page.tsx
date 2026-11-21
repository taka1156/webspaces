import { Metadata } from 'next';
import { BaseHeading } from '@/components/shared/BaseHeading/BaseHeading';
import { ArticleList } from '@/components/blog/ArticleList/ArticleList';
import { getArticles } from '@/utils/ssg/brite';
import { BASE_URL, LOGO_TEXT } from '@/constants';
import { OGP_SIZE, buildOgpImage } from '@/utils/ogp';
import { styles } from './top.css';

const getStaticArticles = async () => {
  return await getArticles('blog');
};

export const generateMetadata = (): Metadata => {
  const title = 'トップ';
  const description =
    'taka1156のポートフォリオ兼ブログ。\nTSやGo、electron、Reactなど技術関連の記事を更新中';
  const type = 'article';
  const url = `${BASE_URL}/`;

  return {
    title: `${title} | ${LOGO_TEXT}`,
    description: description,
    openGraph: {
      type: type,
      title: `${title} | ${LOGO_TEXT}`,
      description: description,
      url: url,
      images: [buildOgpImage(BASE_URL, ['top'], OGP_SIZE.icon, 'top ogp image')]
    },
    twitter: {
      card: 'summary'
    }
  };
};

const Articles = async () => {
  const articles = await getStaticArticles();

  return (
    <div className={styles.container}>
      <BaseHeading hLv='1' className={styles.heading}>
        Top
      </BaseHeading>
      <ArticleList summaries={articles.map(({ summary }) => summary)} />
    </div>
  );
};

export default Articles;
