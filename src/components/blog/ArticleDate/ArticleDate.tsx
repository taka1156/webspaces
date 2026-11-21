import { BaseImg } from '@/components/shared/BaseImg/BaseImg';
import { BaseText } from '@/components/shared/BaseText/BaseText';
import { dayjs } from '@/utils/dayjs';
import { styles } from './ArticleDate.css';

type ArticleDateProps = {
  createdAt: string;
  updatedAt: string;
};

export function ArticleDate({ createdAt, updatedAt }: ArticleDateProps) {
  const formatDate = (date = '') => {
    if (date === '') return '--/--/--';
    return dayjs(date).tz().format('YYYY/M/D');
  };

  return (
    <div className={styles.articleDate}>
      <BaseImg
        src='/img/icon/utils/date.svg'
        alt='日付'
        className={styles.articleDateImg}
      />
      <BaseText className={styles.articleDateText}>
        作成日:{formatDate(createdAt)} ~ 更新日:{formatDate(updatedAt)}
      </BaseText>
    </div>
  );
}
