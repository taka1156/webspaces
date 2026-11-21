'use client';
import { useCallback, useSyncExternalStore } from 'react';
import { THEME_STORAGE_KEY, Theme } from '@/constants/theme';

const getTheme = (): Theme =>
  document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';

const getServerTheme = (): Theme => 'light';

// <html data-theme> の変更を購読する（初期値はインラインスクリプトで設定済み）
const subscribe = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
  });
  return () => observer.disconnect();
};

/**
 * ライト/ダークモードの状態と切り替え関数を返すフック
 *
 * 切り替えた値は localStorage に保存され、次回訪問時に復元される
 */
const useTheme = () => {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);

  const toggleTheme = useCallback(() => {
    const next: Theme = getTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // プライベートモード等で保存できない場合は表示の切り替えのみ行う
    }
  }, []);

  return {
    theme,
    isDark: theme === 'dark',
    toggleTheme
  };
};

export { useTheme };
