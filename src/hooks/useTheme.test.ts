import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useTheme } from './useTheme';
import { THEME_STORAGE_KEY } from '@/constants/theme';

describe('useTheme', () => {
  beforeEach(() => {
    delete document.documentElement.dataset.theme;
    localStorage.clear();
  });

  it('data-theme が未設定のとき light を返す', () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('light');
    expect(result.current.isDark).toBe(false);
  });

  it('data-theme="dark" のとき dark を返す', () => {
    document.documentElement.dataset.theme = 'dark';
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('dark');
    expect(result.current.isDark).toBe(true);
  });

  it('toggleTheme で data-theme と localStorage が切り替わる', async () => {
    const { result } = renderHook(() => useTheme());

    act(() => result.current.toggleTheme());
    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
    await waitFor(() => expect(result.current.isDark).toBe(true));

    act(() => result.current.toggleTheme());
    expect(document.documentElement.dataset.theme).toBe('light');
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('light');
    await waitFor(() => expect(result.current.isDark).toBe(false));
  });

  it('外部から data-theme が変更されると追従する', async () => {
    const { result } = renderHook(() => useTheme());
    document.documentElement.dataset.theme = 'dark';
    await waitFor(() => expect(result.current.theme).toBe('dark'));
  });
});
