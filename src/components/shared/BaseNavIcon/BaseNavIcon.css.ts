import { keyframes, style } from '@vanilla-extract/css';
import { vars } from '@/constants/theme.css';

const top = keyframes({
  from: {
    transform: 'translateY(-8px) rotate(0deg)'
  },
  to: {
    transform: 'translateY(0) rotate(-45deg)'
  }
});

const middle = keyframes({
  from: {
    opacity: 1
  },
  to: {
    opacity: 0
  }
});

const bottom = keyframes({
  from: {
    transform: 'translateY(8px) rotate(0deg)'
  },
  to: {
    transform: 'translateY(0) rotate(45deg)'
  }
});

export const styles = {
  buttonReset: style({
    width: 50,
    height: 50,
    cursor: 'pointer',
    transition: 'opacity 0.2s ease',
    ':hover': {
      opacity: 0.75
    }
  }),
  navIcon: style({
    position: 'relative',
    width: 50,
    height: 50
  }),
  navIconBorder: style({
    position: 'absolute',
    top: '36%',
    right: 0,
    left: 0,
    display: 'block',
    width: '70%',
    height: 2,
    margin: 'auto',
    backgroundColor: vars.color.onPrimary,
    borderRadius: 1
  }),
  navIconTopClose: style({
    transform: 'translateY(-8px)'
  }),
  navIconBottomClose: style({
    transform: 'translateY(8px)'
  }),
  navIconTopOpen: style({
    transform: 'translateY(0) rotate(-45deg)',
    animation: `${top} 0.6s ease forwards`
  }),
  navIconMiddleFade: style({
    opacity: 0,
    animation: `${middle} 0.6s ease`
  }),
  navIconBottomOpen: style({
    transform: 'translateY(0) rotate(45deg)',
    animation: `${bottom} 0.6s ease forwards`
  }),
  navIconText: style({
    position: 'absolute',
    bottom: 4,
    left: 0,
    display: 'block',
    width: '100%',
    textAlign: 'center',
    fontSize: 9,
    letterSpacing: '0.05em',
    color: vars.color.onPrimary
  })
};
