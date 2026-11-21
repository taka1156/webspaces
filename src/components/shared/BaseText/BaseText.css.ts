import { THEME_COLOR } from '@/constants/theme';
import { style } from '@vanilla-extract/css';

export type FONT_COLOR = 'base' | 'muted' | 'highlight' | 'white' | 'theme';
export type FONT_WEIGHT = 'regular' | 'bold';
export type FONT_SIZE = 'extraSmall' | 'small' | 'medium' | 'large' | 'extraLarge';

export const FONT_COLORS: Record<FONT_COLOR, string> = {
  base: '#333',
  muted: '#767676',
  highlight: '#616161',
  white: '#fff',
  theme: THEME_COLOR.main
};

export const FONT_WEIGHTS: Record<FONT_WEIGHT, number> = {
  regular: 400,
  bold: 700
};

export const FONT_SIZES: Record<FONT_SIZE, number> = {
  extraSmall: 10,
  small: 14,
  medium: 16,
  large: 18,
  extraLarge: 24
};

export const colorStyles: Record<FONT_COLOR, string> = {
  base: style({
    color: FONT_COLORS.base
  }),
  muted: style({
    color: FONT_COLORS.muted
  }),
  highlight: style({
    color: FONT_COLORS.highlight
  }),
  white: style({
    color: FONT_COLORS.white
  }),
  theme: style({
    color: FONT_COLORS.theme
  })
};

export const weightStyles: Record<FONT_WEIGHT, string> = {
  regular: style({ fontWeight: FONT_WEIGHTS.regular }),
  bold: style({ fontWeight: FONT_WEIGHTS.bold })
};

export const sizeStyles: Record<FONT_SIZE, string> = {
  extraSmall: style({
    fontSize: FONT_SIZES.extraSmall
  }),
  small: style({ fontSize: FONT_SIZES.small }),
  medium: style({ fontSize: FONT_SIZES.medium }),
  large: style({ fontSize: FONT_SIZES.large }),
  extraLarge: style({
    fontSize: FONT_SIZES.extraLarge
  })
};
