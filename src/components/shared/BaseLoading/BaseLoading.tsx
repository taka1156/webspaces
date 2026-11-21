import clsx from 'clsx';
import { styles } from './BaseLoading.css';

type BaseLoadingProps = {
  className?: string;
};

/**
 * ローディングスピナーを表示するコンポーネント
 */
export function BaseLoading({ className }: BaseLoadingProps) {
  return (
    <div
      className={clsx(styles.spinner, className)}
      role='status'
      aria-label='Loading'
    />
  );
}
