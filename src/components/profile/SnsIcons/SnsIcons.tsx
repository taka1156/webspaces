import { BaseLink } from '@/components/shared/BaseLink/BaseLink';
import { styles } from './SnsIcons.css';
import { BaseImg } from '@/components/shared/BaseImg/BaseImg';

type SnsIconsProps = {
  snsIcons: BlogSnsIcons;
};

export function SnsIcons({ snsIcons }: SnsIconsProps) {
  return (
    <ul className={styles.snsIcons}>
      {snsIcons.map((snsIcon) => (
        <li key={snsIcon.name}>
          <BaseLink href={snsIcon.link}>
            <BaseImg
              alt={snsIcon.name}
              src={snsIcon.img}
              className={styles.snsIcon}
            />
          </BaseLink>
        </li>
      ))}
    </ul>
  );
}
