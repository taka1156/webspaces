import { BaseLink } from '@/components/shared/BaseLink/BaseLink';
import { styles } from './SnsIcons.css';
import { BaseImg } from '@/components/shared/BaseImg/BaseImg';
import { BaseIcon } from '@/components/shared/BaseIcon/BaseIcon';

type SnsIconsProps = {
  snsIcons: BlogSnsIcons;
};

export function SnsIcons({ snsIcons }: SnsIconsProps) {
  return (
    <ul className={styles.snsIcons}>
      {snsIcons.map((snsIcon) => (
        <li key={snsIcon.name}>
          <BaseLink href={snsIcon.link}>
            {snsIcon.monochrome ? (
              // 単色ロゴは文字色で描画し、ライト/ダークモードに追従させる
              <span className={styles.snsIcon}>
                <BaseIcon
                  src={snsIcon.img}
                  alt={snsIcon.name}
                  className={styles.snsIconMonochrome}
                />
              </span>
            ) : (
              <BaseImg
                alt={snsIcon.name}
                src={snsIcon.img}
                className={styles.snsIcon}
              />
            )}
          </BaseLink>
        </li>
      ))}
    </ul>
  );
}
