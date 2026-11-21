import { BaseImg } from '@/components/shared/BaseImg/BaseImg';
import { BaseText } from '@/components/shared/BaseText/BaseText';
import { styles } from './ArticleBadge.css';
import clsx from 'clsx';

type ArticleBadgeProps = {
  badgeType: 'category' | 'tag';
  badge: CommonBadge;
  className?: string;
};

export function ArticleBadge({ badgeType, badge }: ArticleBadgeProps) {
  return (
    <div className={clsx(styles.common, styles[badgeType])}>
      <BaseText
        className={styles.articleBadgeText}
        color={badgeType === 'category' ? 'white' : 'theme'}
        size='extraSmall'
      >
        {badge.name}
      </BaseText>
      <BaseImg
        className={styles.articleBadgeImg}
        src={badge.image}
        alt={`${badge.name}の画像`}
      />
    </div>
  );
}
