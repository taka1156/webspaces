'use client';
import { IndexNavigation } from '@/components/shared/IndexNavigation/IndexNavigation';
import { useMarked } from '@/hooks/useMarked';
import { BaseLoading } from '@/components/shared/BaseLoading/BaseLoading';
import { styles } from './ArticleBody.css';

type ArticleBodyProps = {
  body: string;
  containerId?: string;
};

export function ArticleBody({ body, containerId }: ArticleBodyProps) {
  const anchorPrefix = containerId ? `${containerId}-` : '';
  const { parseCompleted, articleBodyTocs, articleBodyText } = useMarked(
    body,
    anchorPrefix
  );

  return (
    <>
      {!parseCompleted && <BaseLoading />}
      {parseCompleted && (
        <>
          <div
            className={`${styles.articleBody} markdown-body`}
            dangerouslySetInnerHTML={{ __html: articleBodyText }}
          />
          <IndexNavigation tocs={articleBodyTocs} containerId={containerId} />
        </>
      )}
    </>
  );
}
