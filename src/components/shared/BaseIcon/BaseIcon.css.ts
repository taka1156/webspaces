import { globalStyle, style } from '@vanilla-extract/css';

const icon = style({
  display: 'inline-block',
  // 画像の形で切り抜き、文字色(currentColor)で塗る（mask-image はコンポーネント側で指定）
  backgroundColor: 'currentColor',
  maskRepeat: 'no-repeat',
  maskPosition: 'center',
  maskSize: 'contain',
  WebkitMaskRepeat: 'no-repeat',
  WebkitMaskPosition: 'center',
  WebkitMaskSize: 'contain'
});

// 既定サイズは詳細度 0 にして、利用側の className で確実に上書きできるようにする
globalStyle(`:where(${icon})`, {
  width: 24,
  height: 24
});

export const styles = { icon };
