import { BaseLink } from '@/components/shared/BaseLink/BaseLink';
import { styles } from './NavBar.css';
import { BaseImg } from '@/components/shared/BaseImg/BaseImg';
import { BaseText } from '@/components/shared/BaseText/BaseText';

type NavBar = {
  routes: RouteItems;
};

export function NavBar({ routes }: NavBar) {
  return (
    <div className={styles.navBar}>
      <div className={styles.navBarBox}>
        <BaseLink href='/'>
          <BaseImg
            src='/img/icon/utils/logo.svg'
            alt='Logo'
            className={styles.navBarLogo}
          />
        </BaseLink>
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
