import { style } from '@vanilla-extract/css';
import { vars } from '@/constants/theme.css';

export const styles = {
  navBarPC: style({
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 2,
    width: '100%',
    height: 60,
    backgroundColor: vars.color.nav,
    overflowY: 'scroll'
  }),
  navBarLogoPc: style({
    display: 'flex',
    height: 50,
    width: 160
  }),
  navBarBoxPc: style({
    display: 'flex',
    justifyContent: 'space-between',
    width: '70%',
    height: '85%',
    marginTop: '0.5em',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginBottom: 'auto',
    '@media': {
      'screen and (width >= 1600px)': {
        width: '50%'
      }
    }
  }),
  navListPc: style({
    listStyleType: 'none',
    display: 'flex',
    justifyContent: 'space-around',
    width: '70%',
    padding: 0,
    margin: 0
  }),
  navBarThemeTogglePc: style({
    flexShrink: 0,
    alignSelf: 'center',
    color: vars.color.onPrimary
  }),
  navListItemLinkPc: style({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    marginTop: 10
  }),
  navListItemTextPc: style({
    color: vars.color.onPrimary,
    margin: '0 auto'
  }),
  navListItemImgPc: style({
    width: 20,
    height: 20,
    marginLeft: 4,
    marginRight: 4
  })
};
