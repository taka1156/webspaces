import {
  createGlobalTheme,
  createThemeContract,
  globalStyle,
  style
} from '@vanilla-extract/css';
import { THEME_COLOR } from './theme';

/**
 * ライト/ダークモードで切り替わる色トークン
 *
 * `<html data-theme="light|dark">` に応じてCSS変数の値が切り替わる
 */
export const vars = createThemeContract({
  color: {
    /** ブランドカラー（塗り・ボーダー用） */
    primary: null,
    /** ブランドカラー（文字・アイコン用。背景とのコントラストを確保） */
    primaryText: null,
    /** onPrimary の文字を載せる塗り（ボタン・バッジ。白文字とのコントラスト 4.5:1 以上） */
    primaryFill: null,
    /** ブランドカラー上に載せる文字色 */
    onPrimary: null,
    /** ナビゲーション/フッターの背景 */
    nav: null,
    /** ページ背景 */
    background: null,
    /** 見出し・ヘッダーなどの面 */
    surface: null,
    /** ポップオーバー・ダイアログなど浮いている面 */
    surfaceRaised: null,
    /** 本文 */
    text: null,
    /** 見出し（面の上） */
    textHeading: null,
    /** 補助テキスト */
    textMuted: null,
    /** 強調テキスト */
    textHighlight: null,
    /** 区切り線・ボーダー */
    border: null,
    /** 薄い区切り線 */
    borderSubtle: null,
    /** 影 */
    shadow: null,
    /** ブランドカラーの影 */
    primaryShadow: null,
    /** マークダウンの注釈ブロック背景 */
    calloutPoint: null,
    calloutInfo: null,
    calloutWarn: null,
    calloutAlert: null
  }
});

const lightColor = {
  primary: THEME_COLOR.main,
  primaryText: '#3a6fd8',
  primaryFill: '#3d6ac9',
  onPrimary: '#fff',
  // 白文字とのコントラスト 4.5:1 以上を確保するため main より濃くしている
  nav: 'rgb(61 106 201 / 95%)',
  background: '#fff',
  surface: '#f5f5f5',
  surfaceRaised: '#fff',
  text: '#333',
  textHeading: '#494949',
  textMuted: '#767676',
  textHighlight: '#616161',
  border: '#d3d3d3',
  borderSubtle: 'rgb(211 211 211 / 60%)',
  shadow: 'rgb(0 0 0 / 12%)',
  primaryShadow: 'rgb(100 149 237 / 45%)',
  calloutPoint: '#d0e6f6',
  calloutInfo: '#e3f7df',
  calloutWarn: '#fdf9e2',
  calloutAlert: '#feebee'
};

const darkColor = {
  primary: THEME_COLOR.main,
  primaryText: '#8fb3f5',
  primaryFill: '#3d6ac9',
  onPrimary: '#fff',
  nav: 'rgb(44 74 128 / 92%)',
  background: '#14171c',
  surface: '#1e232a',
  surfaceRaised: '#252b33',
  text: '#e6e8eb',
  textHeading: '#e6e8eb',
  textMuted: '#9ba1aa',
  textHighlight: '#c3c8cf',
  border: '#3a414b',
  borderSubtle: 'rgb(58 65 75 / 60%)',
  shadow: 'rgb(0 0 0 / 50%)',
  primaryShadow: 'rgb(0 0 0 / 45%)',
  calloutPoint: '#1c3047',
  calloutInfo: '#1d3524',
  calloutWarn: '#3a3420',
  calloutAlert: '#42232a'
};

createGlobalTheme(':root', vars, { color: lightColor });
createGlobalTheme(':root[data-theme="dark"]', vars, { color: darkColor });

globalStyle(':root', { colorScheme: 'light' });
globalStyle(':root[data-theme="dark"]', { colorScheme: 'dark' });

globalStyle('body', {
  color: vars.color.text,
  backgroundColor: vars.color.background
});

/**
 * テーマに応じて要素の表示/非表示を切り替えるクラス
 *
 * data-theme を直接参照するため、ハイドレーション前から正しい方が表示される
 */
export const themeVisibility = {
  lightOnly: style({
    selectors: {
      ':root[data-theme="dark"] &': {
        display: 'none'
      }
    }
  }),
  darkOnly: style({
    selectors: {
      ':root:not([data-theme="dark"]) &': {
        display: 'none'
      }
    }
  })
};
