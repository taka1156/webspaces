import { BaseText } from '@/components/shared/BaseText/BaseText';
import { BaseHeading } from '@/components/shared/BaseHeading/BaseHeading';
import { BaseLink } from '@/components/shared/BaseLink/BaseLink';
import { styles } from './RelativeArticleList.css';

type RelativeArticleList = {
  category: CommonBadge;
  relatedArticles: CommonArticles;
};

export function RelativeArticleList({
  category,
  relatedArticles
}: RelativeArticleList) {
  const { name } = category;
  return (
    <div className={styles.relativeArticleList}>
      <BaseHeading
        id='anchor_relative'
        hLv='2'
        className={styles.baseHeading2RelativeArticleList}
      >
        関連記事: {name}
      </BaseHeading>
      {relatedArticles.length !== 0 && (
        <div className={styles.relativeArticleListBox}>
          {relatedArticles.map((article) => (
            <div key={article.id}>
              <BaseLink href={`/article/${article.id}/`}>
                <BaseHeading
                  hLv='3'
                  className={styles.baseHeading3RelativeArticleList}
                >
                  {article.title}
                </BaseHeading>
              </BaseLink>
            </div>
          ))}
        </div>
      )}
      {relatedArticles.length === 0 && (
        <BaseText className={styles.baseTextRelativeArticleList}>
          関連記事は、まだありません。
        </BaseText>
      )}
    </div>
  );
}
