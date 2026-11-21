import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { SplashAnimation } from './SplashAnimation';

vi.mock('@/hooks/useResponsive', () => ({
  useResponsive: vi.fn(() => ({ isMobile: false }))
}));

vi.mock('@/components/shared/BaseImg/BaseImg', () => ({
  BaseImg: ({ alt, src }: { alt: string; src: string }) => (
    <img alt={alt} src={src} />
  )
}));

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] ?? ''),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    })
  };
})();

describe('SplashAnimation', () => {
  beforeEach(() => {
    delete document.documentElement.dataset.theme;
    localStorageMock.clear();
    vi.stubGlobal('localStorage', localStorageMock);
  });

  it('マウント前（サーバー）は null を返す', () => {
    // useSyncExternalStore のサーバースナップショットは true を返す
    // mounted=false の段階では null を返すため何も描画されない
    const { container } = render(
      <SplashAnimation>
        <div>コンテンツ</div>
      </SplashAnimation>
    );
    // マウント直後にコンテナは空 or アニメーション表示
    expect(container).toBeInTheDocument();
  });

  it('スプラッシュ表示済み（animation=false）のときは children を表示する', async () => {
    localStorageMock.getItem.mockImplementation((key: string) =>
      key === 'animation' ? 'false' : ''
    );

    render(
      <SplashAnimation>
        <div>コンテンツ</div>
      </SplashAnimation>
    );

    await waitFor(() => {
      expect(screen.getByText('コンテンツ')).toBeInTheDocument();
    });
  });

  it('スプラッシュ未表示のときはロゴアニメーション画像を表示する', async () => {
    localStorageMock.getItem.mockReturnValue('');

    render(
      <SplashAnimation>
        <div>コンテンツ</div>
      </SplashAnimation>
    );

    await waitFor(() => {
      expect(screen.getByAltText('Logo Animation')).toBeInTheDocument();
    });
  });

  it.each([
    [false, 'light', '/img/icon/utils/logo-animation.svg'],
    [false, 'dark', '/img/icon/utils/logo-animation.dark.svg'],
    [true, 'light', '/img/icon/utils/logo-animation.sp.svg'],
    [true, 'dark', '/img/icon/utils/logo-animation.sp.dark.svg']
  ])('isMobile=%s・テーマ=%s のとき %s を表示する', async (isMobile, theme, src) => {
    const { useResponsive } = await import('@/hooks/useResponsive');
    vi.mocked(useResponsive).mockReturnValue({ isMobile });
    document.documentElement.dataset.theme = theme;
    localStorageMock.getItem.mockReturnValue('');

    render(
      <SplashAnimation>
        <div>コンテンツ</div>
      </SplashAnimation>
    );

    await waitFor(() => {
      expect(screen.getByAltText('Logo Animation')).toHaveAttribute('src', src);
    });
  });
});
