import { BaseLink } from '@/components/shared/BaseLink/BaseLink';
import { BaseImg } from '@/components/shared/BaseImg/BaseImg';
import { BaseText } from '@/components/shared/BaseText/BaseText';
import { BaseThemeToggle } from '@/components/shared/BaseThemeToggle/BaseThemeToggle';
import { styles } from './NavBarPc.css';

type NavBarPcProps = {
  routes: RouteItems;
  /** ダークモードが有効かどうか */
  isDark: boolean;
  /** テーマ切り替えボタンがクリックされたときのイベントハンドラー */
  onToggleTheme: () => void;
};

export function NavBarPc({ routes, isDark, onToggleTheme }: NavBarPcProps) {
  return (
    <div className={styles.navBarPC}>
      <div className={styles.navBarBoxPc}>
        <BaseLink href='/'>
          <BaseImg
            src='/img/icon/utils/logo.svg'
            alt='Logo'
            className={styles.navBarLogoPc}
          />
        </BaseLink>
        <ul className={styles.navListPc}>
          {routes.length !== 0 && (
            <>
              {routes.map((routeItem) => (
                <li key={routeItem.name}>
                  <BaseLink
                    href={routeItem.href}
                    className={styles.navListItemLinkPc}
                  >
                    <BaseImg
                      className={styles.navListItemImgPc}
                      src={routeItem.img}
                      alt={`${routeItem.name}の画像`}
                    />
                    <BaseText
                      className={styles.navListItemTextPc}
                      size='extraLarge'
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
        <BaseThemeToggle
          isDark={isDark}
          onClick={onToggleTheme}
          className={styles.navBarThemeTogglePc}
        />
      </div>
    </div>
  );
}
