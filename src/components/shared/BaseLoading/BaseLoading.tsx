import { styles } from './BaseLoading.css';

/**
 * ローディングスピナーを表示するコンポーネント
 */
export function BaseLoading() {
  return <div className={styles.spinner} role='status' aria-label='Loading' />;
}
