import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ClassificationImage } from './ClassificationImage';

describe('ClassificationImage', () => {
  it('src と alt を設定した画像を表示する', () => {
    render(<ClassificationImage src='/logo.svg' alt='ロゴ' />);
    const img = screen.getByRole('img', { name: 'ロゴ' });
    expect(img.tagName).toBe('IMG');
    expect(img).toHaveAttribute('src', '/logo.svg');
  });

  it('className を適用する', () => {
    render(<ClassificationImage src='/logo.svg' alt='ロゴ' className='custom' />);
    expect(screen.getByRole('img', { name: 'ロゴ' })).toHaveClass('custom');
  });
});
