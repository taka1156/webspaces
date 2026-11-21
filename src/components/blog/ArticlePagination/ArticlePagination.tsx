// TODO: 削除対象?
import { BaseLink } from '@/components/shared/BaseLink/BaseLink';
import { BaseText } from '@/components/shared/BaseText/BaseText';
import { styles } from './ArticlePagination.css';

type ArticlePaginationProps = {
  routePath: string;
  prevIndex: number;
  nextIndex: number;
  currentPage: number;
  maxPage: number;
};

export function ArticlePagination({
  routePath,
  prevIndex,
  nextIndex,
  currentPage,
  maxPage
}: ArticlePaginationProps) {
  return (
    <div className={styles.articlePagination}>
      <BaseLink
        data-testid='targetPaginationPrevLink'
        href={`/${routePath}/${prevIndex}/`}
        className={styles.baseLinkPagination}
      >
        &lt;
      </BaseLink>
      <BaseText
        data-testid='targetPaginationCurrentText'
        className={styles.baseTextPagination}
      >
        {`${currentPage}/${maxPage}`}
      </BaseText>
      <BaseLink
        data-testid='targetPaginationNextLink'
        href={`/${routePath}/${nextIndex}/`}
        className={styles.baseLinkPagination}
      >
        &gt;
      </BaseLink>
    </div>
  );
}
