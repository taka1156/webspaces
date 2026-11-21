import { Metadata } from 'next';
import { BaseText } from '@/components/shared/BaseText/BaseText';
import { ClassificationTitle } from '@/components/blog/ClassificationTitle/ClassificationTitle';
import { ArticleList } from '@/components/blog/ArticleList/ArticleList';
import { getClassification } from '@/utils/ssg/brite';
import { BASE_URL } from '@/constants';
import { OGP_SIZE, buildOgpImage } from '@/utils/ogp';
import { styles } from './tag.css';

export const generateStaticParams = async () => {
  const tags = await getClassification('blog', 'tag');
  return tags ? tags.map(({ name }) => ({ id: name })) : [];
};

const getStaticTag = async (
  id: string
): Promise<CommonClassificationItem | undefined> => {
  const tags = await getClassification('blog', 'tag');
  return tags.find((tag) => tag.name === id);
};

export const generateMetadata = async (props: {
  params: TagPath;
}): Promise<Metadata> => {
  const { id } = await props.params;

  const title = `${id}タグの記事一覧`;
  const description = `${id}関連の記事`;
  const type = 'article';
  const url = `${BASE_URL}/tag/${id}/`;

  return {
    title: title,
    description: description,
    openGraph: {
      type: type,
      title: title,
      description: description,
      url: url,
      images: [buildOgpImage(BASE_URL, ['tag', id], OGP_SIZE.icon, 'tag ogp image')]
    },
    twitter: {
      card: 'summary'
    }
  };
};

const Tag = async (props: { params: TagPath }) => {
  const { id } = await props.params;
  const tag = await getStaticTag(id);
  const summaryByTag = tag ? tag.posts : null;
  const imageUrl = tag!.image;

  if (summaryByTag) {
    return (
      <div className={styles.container}>
        <ClassificationTitle src={imageUrl}>{id}</ClassificationTitle>
        <ArticleList summaries={summaryByTag ?? []} />
      </div>
    );
  }

  return <BaseText>存在しないタグです。</BaseText>;
};

export default Tag;
