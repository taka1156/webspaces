'use client';
import { useEffect, useSyncExternalStore, useState } from 'react';
import { BaseImg } from '@/components/shared/BaseImg/BaseImg';
import { useResponsive } from '@/hooks/useResponsive';
import { styles } from './SplashAnimation.css';
import { createPortal } from 'react-dom';

const STORAGE_KEY = 'animation';
const STARTED_AT_KEY = 'animationStartedAt';
const DURATION = 4600;

const listeners = new Set<() => void>();

const markAnimationAsSeen = () => {
  localStorage.setItem(STORAGE_KEY, 'false');
  listeners.forEach((listener) => listener());
};

const resetAnimation = () => {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(STARTED_AT_KEY);
  listeners.forEach((listener) => listener());
};

const resetDebugParams = () => {
  if (typeof window === 'undefined') return;
  const url = new URL(window.location.href);
  url.searchParams.delete('debug');
  window.history.replaceState({}, '', url.toString());
};

const subscribe = (
  callback: () => void,
  setMounted: React.Dispatch<React.SetStateAction<boolean>>
) => {
  listeners.add(callback);
  setMounted(true);
  return () => listeners.delete(callback);
};

const getSnapshot = () => localStorage.getItem(STORAGE_KEY) !== 'false';
const getServerSnapshot = () => true;

// デバッグモードを有効にするかどうかを判定する関数
const enableDebugMode = () => {
  if (typeof window === 'undefined') return false;
  const debug = new URLSearchParams(window.location.search).get('debug');
  return debug === 'true' || debug === '1';
};

export function SplashAnimation({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const showSplash = useSyncExternalStore(
    (callback) => subscribe(callback, setMounted),
    getSnapshot,
    getServerSnapshot
  );
  const { isMobile } = useResponsive();

  const debug = enableDebugMode();

  useEffect(() => {
    // デバッグモードが有効な場合、アニメーションをリセットし、URLパラメータを削除する
    if (debug) {
      resetAnimation();
      resetDebugParams();
    }

    // アニメーション表示済み
    if (!showSplash) return;

    // 開始時刻を永続化しておく。再マウントされても最初の1回の値を使い回す
    const startedAt = Number(localStorage.getItem(STARTED_AT_KEY)) || Date.now();
    localStorage.setItem(STARTED_AT_KEY, String(startedAt));

    const remaining = Math.max(0, DURATION - (Date.now() - startedAt));

    const timer = setTimeout(() => {
      localStorage.removeItem(STARTED_AT_KEY);
      markAnimationAsSeen();
    }, remaining);

    return () => {
      clearTimeout(timer);
    };
  }, [showSplash, debug]);

  if (!mounted) return null;

  if (showSplash) {
    return createPortal(
      <BaseImg
        src={
          isMobile
            ? '/img/icon/utils/logo-animation.sp.svg'
            : '/img/icon/utils/logo-animation.svg'
        }
        alt='Logo Animation'
        className={styles.splash}
      />,
      document.body
    );
  }

  return <>{children}</>;
}
