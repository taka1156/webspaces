import { style } from '@vanilla-extract/css';
import { vars } from '@/constants/theme.css';

export const styles = {
  classificationList: style({
    listStyleType: 'none',
    margin: 0,
    padding: 0
  }),
  link: style({
    color: vars.color.text,
    textAlign: 'left',
    wordBreak: 'break-word',
    overflowWrap: 'break-word'
  }),
  classificationListItem: style({
    display: 'block',
    padding: 10,
    margin: 10,
    cursor: 'pointer',
    border: `1px solid ${vars.color.primary}`,
    borderRadius: 8
  }),
  classificationListItemBox: style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }),
  classificationListItemImg: style({
    width: 50,
    height: 50
  })
};
