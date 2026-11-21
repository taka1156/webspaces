import { BaseHeading } from '@/components/shared/BaseHeading/BaseHeading';
import { ArticleDate } from '@/components/blog/ArticleDate/ArticleDate';
import { ArticleCategory } from '../ArticleCategory/ArticleCategory';
import { ArticleTag } from '../ArticleTag/ArticleTag';
import { styles } from './ArticleHeader.css';

type ArticleHeaderProps = {
  summary: ArticleSummary;
};

export function ArticleHeader({ summary }: ArticleHeaderProps) {
  const { title, category, tags, created_at, updated_at } = summary;

  return (
    <div className={styles.articleHeader}>
      <ArticleCategory category={category} />
      <ArticleDate createdAt={created_at} updatedAt={updated_at} />
      <BaseHeading hLv='1' className={styles.articleHeaderHeading}>
        {title}
      </BaseHeading>
      <ArticleTag tags={tags} />
    </div>
  );
}
