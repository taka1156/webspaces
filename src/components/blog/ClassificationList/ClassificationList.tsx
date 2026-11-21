import { BaseLink } from '@/components/shared/BaseLink/BaseLink';
import { BaseHeading } from '@/components/shared/BaseHeading/BaseHeading';
import { BaseImg } from '@/components/shared/BaseImg/BaseImg';
import { styles } from './ClassificationList.css';

type ClassificationListProps = {
  items: CommonClassificationItems;
  routePath: 'category' | 'tag';
};

export function ClassificationList({ items, routePath }: ClassificationListProps) {
  if (items.length !== 0) {
    return (
      <ul className={styles.classificationList}>
        {items.map((item) => (
          <li key={item.name}>
            <article className={styles.classificationListItem}>
              <BaseLink href={`/${routePath}/${item.name}/`} className={styles.link}>
                <div className={styles.classificationListItemBox}>
                  <BaseHeading hLv='2'>{item.name}</BaseHeading>
                  <BaseImg
                    className={styles.classificationListItemImg}
                    src={item.image}
                    alt={`${item.name}のロゴ`}
                  />
                </div>
              </BaseLink>
            </article>
          </li>
        ))}
      </ul>
    );
  } else {
    return <p>{routePath}がありません。</p>;
  }
}
