import { responsiveDown } from '@/utils/breakpoint';
import { vars } from '@/constants/theme.css';
import { style } from '@vanilla-extract/css';

export const styles = {
  container: style({
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
    paddingTop: '2rem',
    paddingBottom: '2rem'
  }),
  contents: style({
    margin: '16px'
  }),
  profileHeading: style({
    textAlign: 'center',
    padding: '0 0 10px',
    margin: 0,
    borderBottom: `2.5px solid ${vars.color.border}`
  }),
  profileSubHeading: style({
    textAlign: 'center',
    fontSize: '1.25em'
  }),
  cardList: style({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    ...responsiveDown({
      sp: {
        gridTemplateColumns: '1fr'
      }
    })
  })
};
