import clsx from 'clsx';
import { BaseImg } from '@/components/shared/BaseImg/BaseImg';
import { styles } from './ClassificationImage.css';

type ClassificationImageProps = {
  src: string;
  alt: string;
  className?: string;
};

/**
 * カテゴリ・タグの画像（brite から sync された画像）を表示するコンポーネント
 *
 * 画像の色（黒系のロゴ・カラーのロゴ）に関わらず見えるよう、
 * ライト/ダークモード共通で明るい下地の上に表示する
 */
export function ClassificationImage({
  src,
  alt,
  className
}: ClassificationImageProps) {
  return (
    <BaseImg src={src} alt={alt} className={clsx(styles.backplate, className)} />
  );
}
