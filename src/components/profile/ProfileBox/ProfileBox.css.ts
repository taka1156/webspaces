import { responsiveDown } from '@/utils/breakpoint';
import { vars } from '@/constants/theme.css';
import { style } from '@vanilla-extract/css';

export const styles = {
  profileBox: style({
    display: 'flex',
    justifyContent: 'center',
    height: 130,
    padding: 0,
    margin: '0 auto',
    border: `0.5px solid ${vars.color.border}`,
    borderRadius: 8,
    ...responsiveDown({
      sp: {
        flexDirection: 'column',
        height: 'auto'
      }
    })
  }),
  profileImg: style({
    width: 100,
    height: 100,
    margin: '8px 16px 8px 8px',
    borderRadius: '50%',
    ...responsiveDown({
      sp: {
        margin: '8px auto 8px'
      }
    })
  }),
  profileText: style({
    padding: 8,
    textAlign: 'left'
  })
};
