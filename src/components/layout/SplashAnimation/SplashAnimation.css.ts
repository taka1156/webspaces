import { style, keyframes } from '@vanilla-extract/css';
import { vars } from '@/constants/theme.css';

const fadeOut = keyframes({
  '0%': { opacity: 1, scale: 1 },
  '100%': { opacity: 0, scale: 5 }
});

export const styles = {
  splash: style({
    width: '100vw',
    height: '100vh',
    objectFit: 'fill',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: vars.color.background,
    zIndex: 9999,
    animationName: fadeOut,
    animationDuration: '0.35s',
    animationTimingFunction: 'ease-in',
    animationDelay: '4.5s',
    animationFillMode: 'forwards',
    pointerEvents: 'none'
  })
};
