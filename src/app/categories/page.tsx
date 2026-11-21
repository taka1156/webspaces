import { Metadata } from 'next';
import { BaseHeading } from '@/components/shared/BaseHeading/BaseHeading';
import { ClassificationList } from '@/components/blog/ClassificationList/ClassificationList';
import { getClassification } from '@/utils/ssg/brite';
import { BASE_URL } from '@/constants';
import { OGP_SIZE, buildOgpImage } from '@/utils/ogp';
import { styles } from './categories.css';

const getStaticCategories = async () => {
  return await getClassification('blog', 'category');
};

export const generateMetadata = (): Metadata => {
  const title = 'カテゴリー 一覧';
  const description =
    'taka1156のカテゴリー一覧。\nTSやGo、electron、Reactなど技術関連の記事を更新中';
  const type = 'article';
  const url = `${BASE_URL}/categories/`;

  return {
    title: title,
    description: description,
    openGraph: {
      type: type,
      title: title,
      description: description,
      url: url,
      images: [
        buildOgpImage(BASE_URL, ['categories'], OGP_SIZE.icon, 'category ogp image')
      ]
    },
    twitter: {
      card: 'summary'
    }
  };
};

const Categories = async () => {
  const categories = await getStaticCategories();
  const hasCategories = categories != null && categories.length > 0;

  return (
    <div className={styles.container}>
      <BaseHeading hLv='1' className={styles.heading}>
        Category
      </BaseHeading>
      {hasCategories ? (
        <ClassificationList routePath='category' items={categories} />
      ) : (
        <BaseHeading hLv='2'>カテゴリーが見つかりませんでした。</BaseHeading>
      )}
    </div>
  );
};

export default Categories;
