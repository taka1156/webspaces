'use client';
import { ArticleTag } from '@/components/blog/ArticleTag/ArticleTag';
import { BaseImg } from '@/components/shared/BaseImg/BaseImg';
import { BaseHeading } from '@/components/shared/BaseHeading/BaseHeading';
import { BaseText } from '@/components/shared/BaseText/BaseText';
import { RefObject, useRef } from 'react';
import { styles } from './DevelopmentCard.css';
import { ArticleBody } from '@/components/shared/ArticleBody/ArticleBody';
import { ArticleCategory } from '@/components/blog/ArticleCategory/ArticleCategory';

const DIALOG_ID = 'development-card-dialog';

type DevelopmentCardProps = {
  index: number;
  article: ArticleElement;
  className?: string;
};

const openDialog = (modalRef: RefObject<HTMLDialogElement | null>) => {
  if (!modalRef.current?.open) {
    modalRef.current?.showModal();
  }
  if (modalRef.current?.open) {
    modalRef.current?.close();
  }
};

export function DevelopmentCard(props: DevelopmentCardProps) {
  const { thumbnail, title, description, category, tags } = props.article.summary;

  const modalRef = useRef<HTMLDialogElement>(null);

  return (
    <div className={props.className}>
      <article className={styles.cardListItem}>
        <figure className={styles.figure}>
          <BaseImg
            src={thumbnail}
            alt={`${title}の画像`}
            className={styles.cardImg}
          />
          <figcaption className={styles.cardCaption}>
            <BaseHeading hLv='2' className={styles.heading}>
              {title}
            </BaseHeading>
            <ArticleCategory category={category} enableLink={false} />
            <ArticleTag tags={tags} enableLink={false} />
            {description && (
              <BaseText className={styles.description}>{description}</BaseText>
            )}
          </figcaption>
          <button
            className={styles.button}
            onClick={() => {
              if (!modalRef.current?.open) {
                modalRef.current?.showModal();
              }
            }}
          >
            詳細
          </button>

          <dialog
            ref={modalRef}
            id={`${DIALOG_ID}-${props.index}`}
            className={styles.dialog}
          >
            <div className={styles.dialogHeader}>
              <BaseHeading hLv='2'>{title}</BaseHeading>
              <button
                className={styles.dialogClose}
                onClick={() => openDialog(modalRef)}
                type='button'
              >
                ×
              </button>
            </div>
            <ArticleBody
              body={props.article.content}
              containerId={`${DIALOG_ID}-${props.index}`}
            />
          </dialog>
        </figure>
      </article>
    </div>
  );
}
