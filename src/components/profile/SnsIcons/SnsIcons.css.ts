import { style } from '@vanilla-extract/css';
import { vars } from '@/constants/theme.css';

export const styles = {
  snsIcons: style({
    listStyleType: 'none',
    display: 'flex',
    justifyContent: 'space-between',
    padding: 0,
    margin: 0
  }),
  snsIcon: style({
    display: 'block',
    width: 50,
    height: 50,
    border: `1px solid ${vars.color.border}`,
    borderRadius: '50%'
  }),
  // 単色ロゴを囲む円形の枠（中のアイコンが円からはみ出さないよう中央寄せ＋切り抜き）
  snsIconFrame: style({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  }),
  snsIconMonochrome: style({
    // 円に内接する正方形（約70.7%）に収まるサイズ
    width: '70%',
    height: '70%',
    color: vars.color.text
  })
};
