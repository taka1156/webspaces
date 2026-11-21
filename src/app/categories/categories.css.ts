import { style } from '@vanilla-extract/css';
import { vars } from '@/constants/theme.css';

export const styles = {
  container: style({
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
    paddingTop: '2rem',
    paddingBottom: '2rem'
  }),
  heading: style({
    textAlign: 'center',
    margin: 0,
    padding: '0 0 10px',
    borderBottom: `2.5px solid ${vars.color.border}`
  })
};
