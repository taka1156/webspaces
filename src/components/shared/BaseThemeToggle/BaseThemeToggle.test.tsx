import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BaseThemeToggle } from './BaseThemeToggle';

describe('BaseThemeToggle', () => {
  const noop = vi.fn();

  it('type="button" のボタンを描画する', () => {
    render(<BaseThemeToggle isDark={false} onClick={noop} />);
    expect(screen.getByRole('button', { name: 'ダークモード' })).toHaveAttribute(
      'type',
      'button'
    );
  });

  it.each([true, false])('isDark=%s のとき aria-pressed に反映される', (isDark) => {
    render(<BaseThemeToggle isDark={isDark} onClick={noop} />);
    expect(screen.getByTestId('targetThemeToggle')).toHaveAttribute(
      'aria-pressed',
      String(isDark)
    );
  });

  it('月/太陽アイコンを両方描画する（表示はdata-themeを参照するCSSで切り替え）', () => {
    render(<BaseThemeToggle isDark={false} onClick={noop} />);
    expect(screen.getByTestId('targetThemeIconMoon')).toBeInTheDocument();
    expect(screen.getByTestId('targetThemeIconSun')).toBeInTheDocument();
  });

  it.each([
    [false, 'ダークモードに切り替え'],
    [true, 'ライトモードに切り替え']
  ])('isDark=%s のとき title に切り替え先を表示する', (isDark, title) => {
    render(<BaseThemeToggle isDark={isDark} onClick={noop} />);
    expect(screen.getByTestId('targetThemeToggle')).toHaveAttribute('title', title);
  });

  it('クリックすると onClick が呼ばれる', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<BaseThemeToggle isDark={false} onClick={onClick} />);
    await user.click(screen.getByTestId('targetThemeToggle'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('className を適用する', () => {
    render(<BaseThemeToggle isDark={false} onClick={noop} className='custom' />);
    expect(screen.getByTestId('targetThemeToggle')).toHaveClass('custom');
  });
});
