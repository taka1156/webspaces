import { style } from '@vanilla-extract/css';
import { vars } from '@/constants/theme.css';

export const styles = {
  common: style({
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    boxSizing: 'border-box',
    // 長い名前でもはみ出さないよう、幅は固定せず最小幅のみ指定する
    minWidth: '6rem',
    height: 28,
    padding: '0 4px 0 10px',
    whiteSpace: 'nowrap',
    // カテゴリ/タグで高さを揃えるため、枠線は共通で持たせて色だけ切り替える
    border: '1px solid transparent',
    borderRadius: 999
  }),
  category: style({
    color: vars.color.onPrimary,
    backgroundColor: vars.color.primaryFill
  }),
  tag: style({
    color: vars.color.primaryText,
    backgroundColor: 'transparent',
    borderColor: vars.color.primaryText
  }),
  articleBadgeImg: style({
    flexShrink: 0,
    width: 20,
    height: 20,
    objectFit: 'contain'
  }),
  articleBadgeText: style({
    display: 'block',
    margin: 0,
    lineHeight: 1
  })
};
