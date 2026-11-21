import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BaseIcon } from './BaseIcon';

describe('BaseIcon', () => {
  it('alt を role="img" のラベルとして設定する', () => {
    render(<BaseIcon src='/icon.svg' alt='日付' />);
    expect(screen.getByRole('img', { name: '日付' })).toBeInTheDocument();
  });

  it('alt が空文字のとき aria-hidden になり読み上げ対象から外れる', () => {
    render(<BaseIcon src='/icon.svg' alt='' />);
    const icon = screen.getByTestId('targetIcon');
    expect(icon).toHaveAttribute('aria-hidden', 'true');
    expect(icon).not.toHaveAttribute('role');
  });

  it('src をマスク画像に設定する', () => {
    render(<BaseIcon src='/icon.svg' alt='icon' />);
    expect(screen.getByTestId('targetIcon').getAttribute('style')).toContain(
      'url("/icon.svg")'
    );
  });

  it('className を適用する', () => {
    render(<BaseIcon src='/icon.svg' alt='icon' className='custom' />);
    expect(screen.getByTestId('targetIcon')).toHaveClass('custom');
  });
});
