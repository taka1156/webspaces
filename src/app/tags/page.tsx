import { Metadata } from 'next';
import { BaseHeading } from '@/components/shared/BaseHeading/BaseHeading';
import { ClassificationList } from '@/components/blog/ClassificationList/ClassificationList';
import { getClassification } from '@/utils/ssg/brite';
import { BASE_URL } from '@/constants';
import { OGP_SIZE, buildOgpImage } from '@/utils/ogp';
import { styles } from './tags.css';

const getStaticTags = async () => {
  return await getClassification('blog', 'tag');
};

export const generateMetadata = (): Metadata => {
  const title = 'タグ 一覧';
  const description =
    'taka1156のタグ一覧。\nTSやGo、electron、Reactなど技術関連の記事を更新中';
  const type = 'article';
  const url = `${BASE_URL}/tags/`;

  return {
    title: title,
    description: description,
    openGraph: {
      type: type,
      title: title,
      description: description,
      url: url,
      images: [buildOgpImage(BASE_URL, ['tags'], OGP_SIZE.icon, 'tags ogp image')]
    },
    twitter: {
      card: 'summary'
    }
  };
};

export default async function Tags() {
  const tags = await getStaticTags();
  const hasTags = tags != null && tags.length > 0;

  return (
    <div className={styles.container}>
      <BaseHeading hLv='1' className={styles.tagTitle}>
        Tag
      </BaseHeading>
      {hasTags ? (
        <ClassificationList routePath='tag' items={tags} />
      ) : (
        <BaseHeading hLv='2'>タグが見つかりませんでした。</BaseHeading>
      )}
    </div>
  );
}
