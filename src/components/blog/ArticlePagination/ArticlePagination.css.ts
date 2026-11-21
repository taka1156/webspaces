import { style } from '@vanilla-extract/css';
import { vars } from '@/constants/theme.css';

export const styles = {
  baseTextPagination: style({
    display: 'block',
    margin: 5,
    padding: 10,
    fontSize: 20,
    color: vars.color.primaryText
  }),
  baseLinkPagination: style({
    display: 'block',
    margin: 5,
    padding: 10,
    fontSize: 20,
    color: vars.color.primaryText,
    background: 'transparent',
    border: 'none'
  }),
  articlePagination: style({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 15,
    marginRight: 'auto',
    marginLeft: 'auto',
    marginBottom: 'auto'
  })
};
