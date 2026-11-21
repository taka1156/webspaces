import { style } from '@vanilla-extract/css';
import { vars } from '@/constants/theme.css';

export const styles = {
  articleList: style({
    listStyleType: 'none',
    margin: 0,
    padding: 0
  }),
  articleListItem: style({
    display: 'block',
    padding: 10,
    margin: 10,
    border: `1px solid ${vars.color.border}`,
    borderRadius: 8
  }),
  articleListItemBorder: style({
    margin: 5,
    border: `1px solid ${vars.color.border}`
  }),
  articleListItemLink: style({
    color: vars.color.primaryText,
    ':hover': {
      color: vars.color.primary
    }
  }),
  articleListItemText: style({
    marginLeft: 5,
    textAlign: 'left'
  }),
  articleListItemHeading: style({
    marginLeft: 5,
    textAlign: 'left',
    fontSize: '1.2rem'
  })
};
