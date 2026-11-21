import clsx from 'clsx';
import { ComponentProps } from 'react';
import {
  FONT_COLOR,
  FONT_SIZE,
  FONT_WEIGHT,
  colorStyles,
  sizeStyles,
  weightStyles
} from './BaseText.css';

type BaseTextProps = ComponentProps<'p'> & {
  /**
   * ライト/ダークモードで切り替わる（値は vars.color を参照）
   * - Base: #333 / #e6e8eb
   * - Muted: #767676 / #9ba1aa (補助テキスト用)
   * - Highlight: #616161 / #c3c8cf
   * - White: #fff (ブランドカラー上の文字)
   * - Theme: #3a6fd8 / #8fb3f5 (テーマ色の文字。コントラスト確保のため main より濃い/明るい)
   */
  color?: FONT_COLOR;
  /**
   * - Regular: 400
   * - Bold: 700
   */
  weight?: FONT_WEIGHT;
  /**
   * - Extra Small: 10px
   * - Small: 14px
   * - Medium: 16px
   * - Large: 18px
   * - Extra Large: 24px
   */
  size?: FONT_SIZE;
};

/**
 * テキストを表示するコンポーネント
 *
 * color、weight、sizeの組み合わせでテキストのスタイルを変更可能
 */
export function BaseText({
  color = 'base',
  weight = 'regular',
  size = 'medium',
  className,
  ...props
}: BaseTextProps) {
  return (
    <p
      {...props}
      className={clsx(
        colorStyles[color],
        weightStyles[weight],
        sizeStyles[size],
        className
      )}
    />
  );
}
