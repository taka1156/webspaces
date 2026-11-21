import { BaseLink } from '@/components/shared/BaseLink/BaseLink';
import { styles } from './NavBar.css';
import { BaseImg } from '@/components/shared/BaseImg/BaseImg';
import { BaseText } from '@/components/shared/BaseText/BaseText';
import { BaseThemeToggle } from '@/components/shared/BaseThemeToggle/BaseThemeToggle';

type NavBar = {
  routes: RouteItems;
  /** ダークモードが有効かどうか */
  isDark: boolean;
  /** テーマ切り替えボタンがクリックされたときのイベントハンドラー */
  onToggleTheme: () => void;
};

export function NavBar({ routes, isDark, onToggleTheme }: NavBar) {
  return (
    <div className={styles.navBar}>
      <div className={styles.navBarBox}>
        <div className={styles.navBarHeader}>
          <BaseLink href='/'>
            <BaseImg
              src='/img/icon/utils/logo.svg'
              alt='Logo'
              className={styles.navBarLogo}
            />
          </BaseLink>
          <BaseThemeToggle
            isDark={isDark}
            onClick={onToggleTheme}
            className={styles.navBarThemeToggle}
          />
        </div>
        <ul className={styles.navList}>
          {routes.length !== 0 && (
            <>
              {routes.map((routeItem) => (
                <li key={routeItem.name}>
                  <BaseLink href={routeItem.href} className={styles.navListItemLink}>
                    <BaseImg
                      className={styles.navListItemImg}
                      src={routeItem.img}
                      alt={`${routeItem.name}の画像`}
                    />
                    <BaseText
                      className={styles.navListItemText}
                      size='medium'
                      color='white'
                    >
                      {routeItem.name}
                    </BaseText>
                  </BaseLink>
                </li>
              ))}
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
