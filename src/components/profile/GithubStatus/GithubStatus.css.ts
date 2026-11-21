import { responsiveDown } from '@/utils/breakpoint';
import { vars } from '@/constants/theme.css';
import { style } from '@vanilla-extract/css';

export const styles = {
  githubStatus: style({
    display: 'flex',
    justifyContent: 'center',
    border: `0.5px solid ${vars.color.primary}`,
    borderRadius: 8,
    ...responsiveDown({
      sp: {
        flexDirection: 'column',
        marginTop: 20
      }
    })
  }),
  githubStatusImg: style({
    height: 'auto',
    width: '40%',
    margin: 0,
    ...responsiveDown({
      sp: {
        width: '100%',
        marginBottom: 16
      }
    })
  })
};
