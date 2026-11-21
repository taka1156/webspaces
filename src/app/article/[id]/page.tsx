import { Metadata } from 'next';
import { BaseText } from '@/components/shared/BaseText/BaseText';
import { ArticleHeader } from '@/components/blog/ArticleHeader/ArticleHeader';
import { ArticleBody } from '@/components/shared/ArticleBody/ArticleBody';
import { getArticleBySlug, getArticles } from '@/utils/ssg/brite';
import { BASE_URL } from '@/constants';
import { OGP_SIZE, buildOgpImage } from '@/utils/ogp';

export const generateStaticParams = async (): Promise<{ id: string }[]> => {
  const articles = await getArticles('blog');
  return articles.map((article) => ({
    id: article.summary.slug
  }));
};

const getStaticArticle = async ({ params }: { params: ArticlePath }) => {
  const { id } = await params;
  const article = await getArticleBySlug('blog', id);
  return article;
};

export const generateMetadata = async (props: {
  params: ArticlePath;
}): Promise<Metadata> => {
  const { summary } = await getStaticArticle(props);

  const { title, description, slug } = summary;
  const type = 'article';
  const url = `${BASE_URL}/article/${slug}`;

  return {
    title: title,
    description: description,
    openGraph: {
      type: type,
      title: title,
      description: description,
      url: url,
      images: [
        buildOgpImage(
          BASE_URL,
          ['article', slug],
          OGP_SIZE.large,
          'article ogp image'
        )
      ]
    },
    twitter: {
      card: 'summary_large_image'
    }
  };
};

export default async function Article(props: { params: ArticlePath }) {
  const { summary, content } = await getStaticArticle(props);

  if (summary != null) {
    return (
      <>
        <ArticleHeader summary={summary} />
        <ArticleBody body={content} />
      </>
    );
  } else {
    return <BaseText>存在しない記事です。</BaseText>;
  }
}
