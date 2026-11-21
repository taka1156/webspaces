import { BaseLink } from '@/components/shared/BaseLink/BaseLink';
import { BaseText } from '@/components/shared/BaseText/BaseText';
import { dayjs } from '@/utils/dayjs';
import { styles } from './TheCopyright.css';

type TheCopyright = {
  copyrightUrl: string;
};

export function TheCopyright({ copyrightUrl }: TheCopyright) {
  const Year = () => dayjs().tz().year();

  return (
    <div className={styles.theCopyright}>
      <BaseText className={styles.theCopyrightText} color='white'>
        &copy; 2019 - {Year()} taka1156 <br />
        使用素材、プライバシーポリシー等は
        <BaseLink href={copyrightUrl} className={styles.theCopyrightLink}>
          コチラ
        </BaseLink>
      </BaseText>
    </div>
  );
}
