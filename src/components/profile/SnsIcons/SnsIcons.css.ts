import { style } from '@vanilla-extract/css';
import { vars } from '@/constants/theme.css';

export const styles = {
  snsIcons: style({
    listStyleType: 'none',
    display: 'flex',
    justifyContent: 'space-between',
    padding: 0,
    margin: 0
  }),
  snsIcon: style({
    display: 'block',
    width: 50,
    height: 50,
    border: `1px solid ${vars.color.border}`,
    borderRadius: '50%'
  }),
  snsIconMonochrome: style({
    display: 'block',
    width: '100%',
    height: '100%',
    color: vars.color.text
  })
};
