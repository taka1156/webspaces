import { style } from '@vanilla-extract/css';
import { vars } from '@/constants/theme.css';

export const styles = {
  baseHeading2RelativeArticleList: style({
    padding: '0.4em 0.5em',
    color: vars.color.textHeading,
    textAlign: 'left',
    background: vars.color.surface,
    borderLeft: `3px solid ${vars.color.primary}`
  }),
  baseHeading3RelativeArticleList: style({
    color: vars.color.primaryText,
    textAlign: 'left',
    borderBottom: `1px solid ${vars.color.border}`
  }),
  baseTextRelativeArticleList: style({
    marginLeft: 5,
    textAlign: 'left'
  }),
  relativeArticleList: style({
    marginBottom: 30
  }),
  relativeArticleListBox: style({
    display: 'flex',
    flexDirection: 'column'
  })
};
