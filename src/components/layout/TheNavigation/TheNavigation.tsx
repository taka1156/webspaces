'use client';
import { NavBar } from '@/components/layout/NavBar/NavBar';
import { NavBarPc } from '@/components/layout/NavBarPc/NavBarPc';
import { useResponsive } from '@/hooks/useResponsive';
import { useTheme } from '@/hooks/useTheme';

type TheNavigation = {
  routes: RouteItems;
};

export function TheNavigation({ routes }: TheNavigation) {
  const { isMobile } = useResponsive();
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav>
      {isMobile && (
        <NavBar routes={routes} isDark={isDark} onToggleTheme={toggleTheme} />
      )}
      {!isMobile && (
        <NavBarPc routes={routes} isDark={isDark} onToggleTheme={toggleTheme} />
      )}
    </nav>
  );
}
