import { style } from '@vanilla-extract/css';

export const styles = {
  // カラー画像は黒い部分が背景に沈まないよう、ダークモード時のみ明るい下地を敷く
  backplate: style({
    selectors: {
      ':root[data-theme="dark"] &': {
        boxSizing: 'border-box',
        padding: 2,
        backgroundColor: 'rgb(255 255 255 / 90%)',
        borderRadius: 6
      }
    }
  })
};
