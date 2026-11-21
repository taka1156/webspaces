import clsx from 'clsx';
import { themeVisibility } from '@/constants/theme.css';
import { styles } from './BaseThemeToggle.css';

type BaseThemeToggleProps = {
  /** ダークモードが有効かどうか（aria-pressed / title に反映） */
  isDark: boolean;
  className?: string;
  /** トグルがクリックされたときのイベントハンドラー */
  onClick: () => void;
};

/**
 * ライト/ダークモードを切り替えるトグルボタン
 *
 * ライトモード時は月アイコン、ダークモード時は太陽アイコンを表示する
 * アイコンは <html data-theme> を参照するCSSで切り替えるため、
 * ハイドレーション前でも現在のテーマに合ったアイコンが表示される
 * 文字色(currentColor)を継承するため、配置先で color を指定して使用する
 */
export function BaseThemeToggle({
  isDark,
  className,
  onClick
}: BaseThemeToggleProps) {
  const label = isDark ? 'ライトモードに切り替え' : 'ダークモードに切り替え';

  return (
    <button
      type='button'
      aria-label='ダークモード'
      aria-pressed={isDark}
      title={label}
      onClick={onClick}
      className={clsx(styles.button, className)}
      data-testid='targetThemeToggle'
    >
      <svg
        className={clsx(styles.icon, themeVisibility.darkOnly)}
        viewBox='0 0 24 24'
        aria-hidden='true'
        data-testid='targetThemeIconSun'
      >
        <path d='M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0-5a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1zm0 17a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1zM3 11h2a1 1 0 1 1 0 2H3a1 1 0 1 1 0-2zm16 0h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2zM5.64 4.22l1.42 1.42a1 1 0 0 1-1.42 1.42L4.22 5.64a1 1 0 0 1 1.42-1.42zm12.72 12.72 1.42 1.42a1 1 0 0 1-1.42 1.42l-1.42-1.42a1 1 0 0 1 1.42-1.42zM4.22 18.36l1.42-1.42a1 1 0 0 1 1.42 1.42l-1.42 1.42a1 1 0 0 1-1.42-1.42zM16.94 5.64l1.42-1.42a1 1 0 0 1 1.42 1.42l-1.42 1.42a1 1 0 0 1-1.42-1.42z' />
      </svg>
      <svg
        className={clsx(styles.icon, themeVisibility.lightOnly)}
        viewBox='0 0 24 24'
        aria-hidden='true'
        data-testid='targetThemeIconMoon'
      >
        <path d='M21.75 15.5A9.75 9.75 0 0 1 8.5 2.25a.75.75 0 0 0-.98-.9A10.5 10.5 0 1 0 22.65 16.48a.75.75 0 0 0-.9-.98z' />
      </svg>
    </button>
  );
}
