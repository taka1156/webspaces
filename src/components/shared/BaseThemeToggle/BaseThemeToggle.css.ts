import { style } from '@vanilla-extract/css';

export const styles = {
  button: style({
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 36,
    height: 36,
    padding: 0,
    margin: 0,
    color: 'inherit',
    cursor: 'pointer',
    background: 'transparent',
    border: '1px solid currentColor',
    borderRadius: '50%',
    transition: 'background-color 0.2s ease, transform 0.2s ease',
    ':hover': {
      backgroundColor: 'rgb(255 255 255 / 15%)',
      transform: 'rotate(15deg)'
    },
    ':focus-visible': {
      outline: '2px solid currentColor',
      outlineOffset: 2
    }
  }),
  icon: style({
    width: 20,
    height: 20,
    fill: 'currentColor'
  })
};
