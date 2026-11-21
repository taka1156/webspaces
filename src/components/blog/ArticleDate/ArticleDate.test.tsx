import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ArticleDate } from './ArticleDate';

vi.mock('@/components/shared/BaseText/BaseText', () => ({
  BaseText: ({ children }: { children: React.ReactNode }) => <p>{children}</p>
}));

vi.mock('@/utils/dayjs', () => ({
  dayjs: Object.assign(
    (date?: string) => ({
      tz: () => ({
        format: (fmt: string) => {
          if (!date) {
            return '--/--/--';
          }
          const d = new Date(date);
          if (fmt === 'YYYY/M/D') {
            return `${d.getUTCFullYear()}/${d.getUTCMonth() + 1}/${d.getUTCDate()}`;
          }
          return date;
        }
      })
    }),
    { extend: () => {} }
  )
}));

describe('ArticleDate', () => {
  it('作成日と更新日を表示する', () => {
    render(
      <ArticleDate
        createdAt='2023-06-15T00:00:00Z'
        updatedAt='2023-06-20T00:00:00Z'
      />
    );
    expect(screen.getByText(/作成日/)).toBeInTheDocument();
    expect(screen.getByText(/更新日/)).toBeInTheDocument();
  });

  it('作成日が空のとき "--/--/--" を表示する', () => {
    render(<ArticleDate createdAt='' updatedAt='2023-06-20T00:00:00Z' />);
    expect(screen.getByText(/--\/--\/--/)).toBeInTheDocument();
  });

  it('更新日が空のとき "--/--/--" を表示する', () => {
    render(<ArticleDate createdAt='2023-06-15T00:00:00Z' updatedAt='' />);
    expect(screen.getByText(/--\/--\/--/)).toBeInTheDocument();
  });

  it('日付アイコンのラベルが正しい', () => {
    render(
      <ArticleDate
        createdAt='2023-06-15T00:00:00Z'
        updatedAt='2023-06-20T00:00:00Z'
      />
    );
    expect(screen.getByRole('img', { name: '日付' })).toBeInTheDocument();
  });
});
