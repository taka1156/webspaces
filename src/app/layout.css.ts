import { responsiveDown } from '@/utils/breakpoint';
import { vars } from '@/constants/theme.css';
import { globalStyle } from '@vanilla-extract/css';

/* css reset */
globalStyle('header, footer', {
  margin: 0,
  padding: 0
});
/* css reset */

globalStyle('.app', {
  textAlign: 'center'
});

globalStyle('.container', {
  margin: '70px auto 0',
  ...responsiveDown({
    sp: {
      margin: '100px auto 0'
    }
  })
});

globalStyle('.box', {
  margin: '0 auto',
  minHeight: '90vh',
  padding: 0,
  '@media': {
    'screen and (width >= 768px)': {
      width: '70vw'
    },
    'screen and (width >= 1600px)': {
      width: '50vw'
    }
  }
});

/* markdown */
globalStyle('.markdown-body h1, .markdown-body h2, .markdown-body h3', {
  color: vars.color.textHeading,
  background: vars.color.surface,
  borderLeft: `3px solid ${vars.color.primary}`,
  padding: '0.4em 0.5em'
});

globalStyle('.markdown-body img', {
  border: `0.2px solid ${vars.color.primary}`,
  padding: '5px'
});

globalStyle('.markdown-body a', {
  textDecoration: 'underline'
});

globalStyle('.markdown-body pre', {
  border: `1px dotted ${vars.color.border}`
});

globalStyle('.markdown-body .container', {
  padding: '1px'
});

globalStyle(
  `.markdown-body .container .point-summary,
   .markdown-body .container .info-summary,
   .markdown-body .container .warn-summary,
   .markdown-body .container .alert-summary`,
  {
    margin: '10px',
    fontWeight: 600
  }
);

globalStyle(
  `.markdown-body .container .point-details,
   .markdown-body .container .info-details,
   .markdown-body .container .warn-details,
   .markdown-body .container .alert-details`,
  {
    margin: '20px',
    marginTop: '5px',
    marginBottom: '5px'
  }
);

globalStyle('.markdown-body .point', {
  backgroundColor: vars.color.calloutPoint
});

globalStyle('.markdown-body .info', {
  backgroundColor: vars.color.calloutInfo
});

globalStyle('.markdown-body .warn', {
  backgroundColor: vars.color.calloutWarn
});

globalStyle('.markdown-body .alert', {
  backgroundColor: vars.color.calloutAlert
});
