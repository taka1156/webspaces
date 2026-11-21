import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { TheNavigation } from './TheNavigation';
import { dummyRoutes } from '@/dummy';

vi.mock('@/hooks/useResponsive', () => ({
  useResponsive: vi.fn()
}));

vi.mock('@/hooks/useTheme', () => ({
  useTheme: () => ({ theme: 'light', isDark: false, toggleTheme: vi.fn() })
}));

vi.mock('@/components/layout/NavBar/NavBar', () => ({
  NavBar: () => <div data-testid='nav-bar' />
}));

vi.mock('@/components/layout/NavBarPc/NavBarPc', () => ({
  NavBarPc: () => <div data-testid='nav-bar-pc' />
}));

describe('TheNavigation', () => {
  it('isMobile=true のとき NavBar を表示する', async () => {
    const { useResponsive } = await import('@/hooks/useResponsive');
    vi.mocked(useResponsive).mockReturnValue({ isMobile: true });

    const { queryByTestId } = render(<TheNavigation routes={dummyRoutes} />);
    expect(queryByTestId('nav-bar')).toBeInTheDocument();
    expect(queryByTestId('nav-bar-pc')).not.toBeInTheDocument();
  });

  it('isMobile=false のとき NavBarPc を表示する', async () => {
    const { useResponsive } = await import('@/hooks/useResponsive');
    vi.mocked(useResponsive).mockReturnValue({ isMobile: false });

    const { queryByTestId } = render(<TheNavigation routes={dummyRoutes} />);
    expect(queryByTestId('nav-bar-pc')).toBeInTheDocument();
    expect(queryByTestId('nav-bar')).not.toBeInTheDocument();
  });

  it('<nav> 要素をルートとして描画する', async () => {
    const { useResponsive } = await import('@/hooks/useResponsive');
    vi.mocked(useResponsive).mockReturnValue({ isMobile: false });

    const { container } = render(<TheNavigation routes={dummyRoutes} />);
    expect(container.querySelector('nav')).toBeInTheDocument();
  });
});
