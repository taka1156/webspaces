import { style } from '@vanilla-extract/css';

export const styles = {
  // brite の画像は明るい背景向けに作られているため、テーマに関わらず明るい下地を敷く
  backplate: style({
    boxSizing: 'border-box',
    padding: 2,
    backgroundColor: '#f5f5f5',
    borderRadius: 6
  })
};
