import clsx from 'clsx';
import { BaseIcon } from '@/components/shared/BaseIcon/BaseIcon';
import { BaseImg } from '@/components/shared/BaseImg/BaseImg';
import { styles } from './ClassificationImage.css';

type ClassificationImageProps = {
  src: string;
  alt: string;
  /** ビルド時に判定された画像のトーン（未判定の場合は color として扱う） */
  imageTone?: ImageTone;
  className?: string;
};

/**
 * カテゴリ・タグの画像（brite から sync された画像）を表示するコンポーネント
 *
 * - mono: 文字色で塗って描画し、ライト/ダークモードでテキストに揃える
 * - color: そのまま描画し、ダークモード時のみ明るい下地を敷く
 */
export function ClassificationImage({
  src,
  alt,
  imageTone,
  className
}: ClassificationImageProps) {
  if (imageTone === 'mono') {
    return <BaseIcon src={src} alt={alt} className={className} />;
  }

  return (
    <BaseImg src={src} alt={alt} className={clsx(styles.backplate, className)} />
  );
}
