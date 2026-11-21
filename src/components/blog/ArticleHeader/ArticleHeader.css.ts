import { style } from '@vanilla-extract/css';
import { vars } from '@/constants/theme.css';

export const styles = {
  articleHeaderHeading: style({
    padding: '10px 0 0',
    marginLeft: 5,
    fontSize: '1.75rem',
    color: vars.color.primaryText,
    textAlign: 'left',
    borderTop: `2.5px solid ${vars.color.border}`
  }),
  articleHeader: style({
    padding: 10,
    backgroundColor: vars.color.surface,
    border: `1px solid ${vars.color.border}`
  })
};
