import { style } from '@vanilla-extract/css';
import { vars } from '@/constants/theme.css';

export const styles = {
  theCopyright: style({
    width: '100%',
    padding: 0,
    margin: 0,
    textAlign: 'left',
    backgroundColor: vars.color.nav
  }),
  theCopyrightLink: style({
    color: vars.color.onPrimary
  }),
  theCopyrightText: style({
    margin: 0
  })
};
