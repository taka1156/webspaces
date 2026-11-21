import { style } from '@vanilla-extract/css';
import { vars } from '@/constants/theme.css';

export const styles = {
  contributionBox: style({
    overflowX: 'scroll',
    border: `0.5px solid ${vars.color.primary}`,
    borderRadius: 5
  }),
  contributionBoxImg: style({
    height: 150,
    width: 900,
    objectFit: 'cover'
  })
};
