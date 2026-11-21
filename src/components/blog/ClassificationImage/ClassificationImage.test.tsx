import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ClassificationImage } from './ClassificationImage';

describe('ClassificationImage', () => {
  it('imageTone=mono のとき文字色で描画するアイコン（span）を表示する', () => {
    render(<ClassificationImage src='/mono.svg' alt='ロゴ' imageTone='mono' />);
    const icon = screen.getByRole('img', { name: 'ロゴ' });
    expect(icon.tagName).toBe('SPAN');
    expect(icon.getAttribute('style')).toContain('url("/mono.svg")');
  });

  it.each([['color' as const], [undefined]])(
    'imageTone=%s のとき画像（img）を表示する',
    (imageTone) => {
      render(
        <ClassificationImage src='/color.svg' alt='ロゴ' imageTone={imageTone} />
      );
      const img = screen.getByRole('img', { name: 'ロゴ' });
      expect(img.tagName).toBe('IMG');
      expect(img).toHaveAttribute('src', '/color.svg');
    }
  );

  it.each([['mono' as const], ['color' as const]])(
    'imageTone=%s のとき className を適用する',
    (imageTone) => {
      render(
        <ClassificationImage
          src='/logo.svg'
          alt='ロゴ'
          imageTone={imageTone}
          className='custom'
        />
      );
      expect(screen.getByRole('img', { name: 'ロゴ' })).toHaveClass('custom');
    }
  );
});
