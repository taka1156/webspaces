'use client';
import { NavBar } from '@/components/layout/NavBar/NavBar';
import { NavBarPc } from '@/components/layout/NavBarPc/NavBarPc';
import { useResponsive } from '@/hooks/useResponsive';

type TheNavigation = {
  routes: RouteItems;
};

export function TheNavigation({ routes }: TheNavigation) {
  const { isMobile } = useResponsive();

  return (
    <nav>
      {isMobile && <NavBar routes={routes} />}
      {!isMobile && <NavBarPc routes={routes} />}
    </nav>
  );
}
