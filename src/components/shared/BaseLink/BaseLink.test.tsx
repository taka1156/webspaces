import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BaseLink } from './BaseLink';

vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <a href={href} data-nextlink='true' {...props}>
      {children}
    </a>
  )
}));

describe('BaseLink', () => {
  describe('内部リンク（http を含まない）', () => {
    it('Next.js Link（data-nextlink 属性付き）を描画する', () => {
      const { container } = render(<BaseLink href='/about'>About</BaseLink>);
      expect(container.querySelector('[data-nextlink="true"]')).toBeInTheDocument();
    });

    it('通常は target="_blank" を持たない', () => {
      const { container } = render(<BaseLink href='/about'>About</BaseLink>);
      expect(container.querySelector('a')).not.toHaveAttribute('target', '_blank');
    });

    it('enableNewTab=true のとき target="_blank" と rel を設定する', () => {
      const { container } = render(
        <BaseLink href='/about' enableNewTab>
          About
        </BaseLink>
      );
      const a = container.querySelector('a');
      expect(a).toHaveAttribute('target', '_blank');
      expect(a).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('パス中に http を含んでも内部リンクとして扱う', () => {
      const { container } = render(
        <BaseLink href='/blog/http-guide'>Guide</BaseLink>
      );
      expect(container.querySelector('[data-nextlink="true"]')).toBeInTheDocument();
    });
  });

  describe('外部リンク（http を含む）', () => {
    it('<a> タグを描画する', () => {
      const { container } = render(
        <BaseLink href='https://example.com'>外部</BaseLink>
      );
      expect(container.querySelector('a')).toBeInTheDocument();
    });

    it('target="_blank" と rel を自動で設定する', () => {
      const { container } = render(
        <BaseLink href='https://example.com'>外部</BaseLink>
      );
      const a = container.querySelector('a');
      expect(a).toHaveAttribute('target', '_blank');
      expect(a).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('href が正しく設定される', () => {
      const { container } = render(
        <BaseLink href='https://example.com'>外部</BaseLink>
      );
      expect(container.querySelector('a')).toHaveAttribute(
        'href',
        'https://example.com'
      );
    });

    it('Next.js Link を使わない（data-nextlink なし）', () => {
      const { container } = render(
        <BaseLink href='https://example.com'>外部</BaseLink>
      );
      expect(
        container.querySelector('[data-nextlink="true"]')
      ).not.toBeInTheDocument();
    });
  });

  it('children を表示する', () => {
    render(<BaseLink href='/test'>リンクテキスト</BaseLink>);
    expect(screen.getByText('リンクテキスト')).toBeInTheDocument();
  });
});
