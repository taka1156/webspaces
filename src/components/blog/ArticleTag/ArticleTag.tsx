import { Fragment } from 'react';
import { BaseLink } from '@/components/shared/BaseLink/BaseLink';
import { ArticleBadge } from '@/components/blog/ArticleBadge/ArticleBadge';
import { styles } from './ArticleTag.css';

type ArticleTagProps = {
  tags: CommonBadges;
  enableLink?: boolean;
};

export function ArticleTag({ tags, enableLink = true }: ArticleTagProps) {
  return (
    <div className={styles.articleTag}>
      タグ:&nbsp;
      {tags.length !== 0 && (
        <>
          {tags.map((tag) => (
            <Fragment key={tag.name}>
              {enableLink ? (
                <BaseLink className={styles.container} href={`/tag/${tag.name}/`}>
                  <ArticleBadge badgeType='tag' badge={tag} />
                </BaseLink>
              ) : (
                <span className={styles.container}>
                  <ArticleBadge badgeType='tag' badge={tag} />
                </span>
              )}
            </Fragment>
          ))}
        </>
      )}
    </div>
  );
}
