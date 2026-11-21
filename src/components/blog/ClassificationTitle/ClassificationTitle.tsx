import { ReactNode } from 'react';
import { BaseHeading } from '@/components/shared/BaseHeading/BaseHeading';
import { ClassificationImage } from '@/components/blog/ClassificationImage/ClassificationImage';
import { styles } from './ClassificationTitle.css';

type ClassificationTitleProps = {
  src: string;
  children: ReactNode;
};

export function ClassificationTitle({ src, children }: ClassificationTitleProps) {
  return (
    <>
      <div className={styles.classificationTitle}>
        <BaseHeading hLv='1' className={styles.baseHeading1ClassificationTitle}>
          {children}
        </BaseHeading>
        <ClassificationImage
          src={src}
          alt='ロゴ'
          className={styles.baseImgClassificationTitle}
        />
      </div>
      <div className={styles.classificationTitleBorder} />
    </>
  );
}
