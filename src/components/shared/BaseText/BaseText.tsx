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
   * - Base: #333
   * - Muted: #767676 (補助テキスト用)
   * - Highlight: #616161
   * - White: #fff
   * - Theme: #6495ED (THEME_COLOR.main)
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
