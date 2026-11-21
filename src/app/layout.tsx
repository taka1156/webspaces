import { Suspense } from 'react';
import type { Metadata } from 'next';
import Script from 'next/script';
import { Scroll } from '@/components/temporary/Scroll';
import { SplashAnimation } from '@/components/layout/SplashAnimation/SplashAnimation';
import { TheNavigation } from '@/components/layout/TheNavigation/TheNavigation';
import { TheCopyright } from '@/components/layout/TheCopyright/TheCopyright';
import { COPYRIGHT_URL, BASE_URL, LOGO_TEXT, ROUTES } from '@/constants/index';
import { THEME_INIT_SCRIPT } from '@/constants/theme';
import 'normalize.css/normalize.css';
import 'github-markdown-css/github-markdown.css';
import './markdown-theme.css';
import '@/constants/theme.css';
import './layout.css';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    template: `%s | ${LOGO_TEXT}`,
    default: LOGO_TEXT
  },
  description:
    'taka1156のポートフォリオ兼ブログ。\nTSやGo、electron、Reactなど技術関連の記事を更新中'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // data-theme は描画前にインラインスクリプトで付与されるため、ハイドレーション差分を抑制する
    <html lang='ja' suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        <Script
          src={`${process.env.NEXT_PUBLIC_OGP_BACKEND_URL}/lib/ogp-card.es.js`}
          type='module'
        />
        <Suspense fallback={null}>
          <Scroll />
          <SplashAnimation>
            <header>
              <TheNavigation routes={ROUTES} />
            </header>
            <div className='container'>
              <main className='box'>{children}</main>
              <footer>
                <TheCopyright copyrightUrl={COPYRIGHT_URL} />
              </footer>
            </div>
          </SplashAnimation>
        </Suspense>
      </body>
    </html>
  );
}
