import { responsiveDown } from '@/utils/breakpoint';
import { vars } from '@/constants/theme.css';
import { style } from '@vanilla-extract/css';

export const styles = {
  cardListItem: style({
    maxWidth: 400,
    minHeight: 430,
    maxHeight: 540,
    margin: '0 auto',
    border: `solid 0.6px ${vars.color.border}`,
    boxShadow: `5px 10px 20px ${vars.color.shadow}`,
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'column',
    padding: 8,
    ...responsiveDown({
      small: {
        height: 'auto'
      }
    })
  }),
  figure: style({
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    margin: 0
  }),
  cardImg: style({
    backgroundColor: vars.color.surface,
    objectFit: 'contain',
    margin: '0 auto',
    width: '100%',
    height: 200,
    flexShrink: 0,
    boxSizing: 'border-box'
  }),
  cardCaption: style({
    overflowWrap: 'anywhere',
    overflow: 'hidden'
  }),
  heading: style({
    fontSize: '1.2em',
    textAlign: 'center',
    paddingTop: 8
  }),
  description: style({
    minHeight: 64,
    maxHeight: 72,
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    WebkitLineClamp: 4
  }),
  button: style({
    marginTop: 'auto',
    display: 'block',
    width: '100%',
    padding: 8,
    borderRadius: 8,
    backgroundColor: vars.color.primaryFill,
    color: vars.color.onPrimary,
    border: 'none',
    cursor: 'pointer',
    transition: 'filter 0.3s ease',
    ':hover': {
      filter: 'brightness(1.1)'
    }
  }),
  dialog: style({
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -30%)',
    width: 'min(90vw, 720px)',
    height: '80vh',
    overflowY: 'auto',
    padding: 24,
    borderRadius: 8,
    border: 'none',
    color: vars.color.text,
    backgroundColor: vars.color.surfaceRaised,
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    '::backdrop': {
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }
  }),
  dialogHeader: style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    borderBottom: `1px solid ${vars.color.border}`,
    paddingBottom: 8
  }),
  dialogClose: style({
    background: 'none',
    border: 'none',
    fontSize: 24,
    lineHeight: 1,
    cursor: 'pointer',
    color: vars.color.textMuted,
    padding: '0 4px',
    ':hover': {
      color: vars.color.text
    }
  })
};
