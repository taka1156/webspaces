import { style } from '@vanilla-extract/css';
import { vars } from '@/constants/theme.css';

export const styles = {
  articleDate: style({
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    margin: 0
  }),
  articleDateImg: style({
    width: 20,
    height: 20,
    color: vars.color.text
  }),
  articleDateText: style({
    margin: 0
  })
};
