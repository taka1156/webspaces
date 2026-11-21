import clsx from 'clsx';
import { styles } from './BaseIcon.css';

type BaseIconProps = {
  /** 単色アイコン画像のパス（透過付きのSVG/PNG） */
  src: string;
  /** 代替テキスト。空文字の場合は装飾として扱い、読み上げ対象から外す */
  alt: string;
  className?: string;
};

/**
 * 単色アイコンを文字色(currentColor)で描画するコンポーネント
 *
 * 画像をCSSマスクとして使うため、ライト/ダークモードで周囲のテキストと同じ色になる
 * サイズと色は className（width / height / color）で指定する
 */
export function BaseIcon({ src, alt, className }: BaseIconProps) {
  const mask = `url("${src}")`;
  const a11yProps =
    alt === '' ? { 'aria-hidden': true } : { role: 'img', 'aria-label': alt };

  return (
    <span
      {...a11yProps}
      className={clsx(styles.icon, className)}
      style={{ maskImage: mask, WebkitMaskImage: mask }}
      data-testid='targetIcon'
    />
  );
}
