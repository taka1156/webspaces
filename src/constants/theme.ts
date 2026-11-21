export const THEME_COLOR = {
  /**
   * - Main: #6495ED
   * - Sub: #64DCED
   * - Accent1: #EDDD64
   * - Accent2: #EDC264
   * - Accent3: #EDC264
   */
  main: '#6495ED',
  sub: '#64DCED',
  accent1: '#EDDD64',
  accent2: '#EDC264',
  accent3: '#EDC264'
};

export type Theme = 'light' | 'dark';

/** テーマ設定を保存する localStorage のキー */
export const THEME_STORAGE_KEY = 'theme';

/**
 * 描画前にテーマを確定させるインラインスクリプト（FOUC対策）
 *
 * 保存済みの設定 → OSの設定（prefers-color-scheme）の順で判定する
 */
export const THEME_INIT_SCRIPT = `(function(){var d=document.documentElement;try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}d.dataset.theme=t}catch(e){d.dataset.theme='light'}})();`;
