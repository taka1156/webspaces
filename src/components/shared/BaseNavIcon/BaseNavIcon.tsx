import { ReactNode } from 'react';
import clsx from 'clsx';
import { styles } from './BaseNavIcon.css';

type BaseNavIconProps = {
  /** ナビゲーションアイコンが開いているかどうか */
  isOpen: boolean;
  /** アイコンの横に表示する任意の要素 */
  children?: ReactNode;
  className?: string;
  /** アイコンがクリックされたときのイベントハンドラー */
  onClick: () => void;
};

/**
 * ナビゲーションアイコンを表示するコンポーネント
 *
 * childrenを渡すことで、アイコンの横に任意の要素を表示可能
 */
export function BaseNavIcon({
  isOpen,
  children,
  onClick,
  className
}: BaseNavIconProps) {
  return (
    <div className={clsx(styles.navIcon, className)}>
      <button
        type='button'
        aria-expanded={isOpen}
        onClick={onClick}
        className={styles.buttonReset}
        data-testid='targetNavButton'
      >
        <span
          className={clsx(
            styles.navIconBorder,
            isOpen ? styles.navIconTopOpen : styles.navIconTopClose
          )}
          data-testid='targetNavTop'
        ></span>
        <span
          className={clsx(styles.navIconBorder, isOpen && styles.navIconMiddleFade)}
          data-testid='targetNavMiddle'
        ></span>
        <span
          className={clsx(
            styles.navIconBorder,
            isOpen ? styles.navIconBottomOpen : styles.navIconBottomClose
          )}
          data-testid='targetNavBottom'
        ></span>
        <span className={styles.navIconText} data-testid='targetNavText'>
          {children}
        </span>
      </button>
    </div>
  );
}
