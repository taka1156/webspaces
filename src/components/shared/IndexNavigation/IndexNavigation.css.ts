import { style } from '@vanilla-extract/css';
import { vars } from '@/constants/theme.css';

export const styles = {
  navIconBox: style({
    top: 0,
    marginTop: 0,
    marginRight: 'auto',
    marginLeft: 'auto',
    marginBottom: 0
  }),
  indexNav: style({
    position: 'fixed',
    right: 16,
    bottom: 40,
    zIndex: 2,
    width: 52,
    height: 52,
    padding: 4,
    backgroundColor: vars.color.nav,
    borderRadius: 6,
    boxShadow: `0 4px 16px ${vars.color.primaryShadow}`,
    transition: 'box-shadow 0.2s ease, transform 0.2s ease',
    ':hover': {
      boxShadow: `0 6px 20px ${vars.color.primaryShadow}`,
      transform: 'scale(1.05)'
    }
  }),
  indexList: style({
    listStyleType: 'none',
    padding: 0,
    margin: 0
  }),
  indexContainer: style({
    position: 'fixed',
    right: 16,
    bottom: 106,
    zIndex: 2,
    width: '55%',
    maxHeight: 280,
    overflowY: 'auto',
    backgroundColor: vars.color.surfaceRaised,
    border: `1px solid ${vars.color.border}`,
    borderRadius: 10,
    boxShadow: `0 8px 24px ${vars.color.shadow}`,
    '::-webkit-scrollbar': {
      width: 6
    },
    '::-webkit-scrollbar-track': {
      display: 'none'
    },
    '::-webkit-scrollbar-thumb': {
      width: '100%',
      backgroundColor: vars.color.primary,
      borderRadius: 6
    },
    '@media': {
      'screen and (width >= 790px)': {
        width: '28%'
      }
    }
  }),
  indexListBox: style({
    padding: '8px 4px',
    marginTop: '0',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginBottom: 'auto'
  }),
  indexListHeading: style({
    color: vars.color.primaryText,
    textAlign: 'center',
    letterSpacing: '0.1em',
    borderBottom: `1px solid ${vars.color.border}`,
    paddingBottom: 8,
    marginBottom: 4
  }),
  indexListItemBox: style({
    margin: '6px 12px',
    textAlign: 'left'
  }),
  indexListItem: style({
    fontSize: 14,
    color: vars.color.text,
    textDecoration: 'none',
    cursor: 'pointer',
    display: 'block',
    padding: '4px 0',
    borderBottom: `1px solid ${vars.color.borderSubtle}`,
    transition: 'color 0.15s ease, padding-left 0.15s ease',
    ':hover': {
      color: vars.color.primaryText,
      paddingLeft: 4
    },
    '@media': {
      'screen and (width >= 790px)': {
        fontSize: 16
      }
    }
  }),
  /* モーダル内用スタイル */
  wrapperModal: style({
    position: 'sticky',
    bottom: 16,
    zIndex: 2,
    display: 'flex',
    justifyContent: 'flex-end'
  }),
  innerRelative: style({
    position: 'relative'
  }),
  indexNavModal: style({
    width: 52,
    height: 52,
    padding: 4,
    backgroundColor: vars.color.nav,
    borderRadius: 6,
    boxShadow: `0 4px 16px ${vars.color.primaryShadow}`,
    transition: 'box-shadow 0.2s ease, transform 0.2s ease',
    ':hover': {
      boxShadow: `0 6px 20px ${vars.color.primaryShadow}`,
      transform: 'scale(1.05)'
    }
  }),
  modalContainer: style({
    position: 'absolute',
    right: 0,
    bottom: 'calc(100% + 8px)',
    zIndex: 2,
    width: 240,
    maxHeight: 220,
    overflowY: 'auto',
    backgroundColor: vars.color.surfaceRaised,
    border: `1px solid ${vars.color.border}`,
    borderRadius: 10,
    boxShadow: `0 8px 24px ${vars.color.shadow}`,
    '::-webkit-scrollbar': {
      width: 6
    },
    '::-webkit-scrollbar-track': {
      display: 'none'
    },
    '::-webkit-scrollbar-thumb': {
      width: '100%',
      backgroundColor: vars.color.primary,
      borderRadius: 6
    }
  })
};
