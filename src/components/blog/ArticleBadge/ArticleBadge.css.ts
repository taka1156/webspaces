import { style } from '@vanilla-extract/css';
import { vars } from '@/constants/theme.css';

export const styles = {
  common: style({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    height: '1.5rem',
    width: '6rem',
    borderRadius: 20
  }),
  category: style({
    color: vars.color.onPrimary,
    backgroundColor: vars.color.primaryFill
  }),
  tag: style({
    color: vars.color.primaryText,
    backgroundColor: 'transparent',
    border: `1px solid ${vars.color.primaryText}`
  }),
  articleBadgeImg: style({
    width: 20,
    height: 20,
    objectFit: 'contain'
  }),
  articleBadgeText: style({
    display: 'block',
    padding: 1
  })
};
