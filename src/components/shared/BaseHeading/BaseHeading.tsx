import { ReactNode, ElementType } from 'react';
import clsx from 'clsx';
import { styles } from './BaseHeading.css';

type BaseHeadingProps = {
  /**
   * - 1 ~ 6 (h1~h6)
   */
  hLv: '1' | '2' | '3' | '4' | '5' | '6';
  children: ReactNode;
  className?: string;
} & React.ComponentPropsWithoutRef<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>;

/**
 * 見出しを表示するコンポーネント
 *
 * hLvに応じてh1~h6の見出しを表示
 */
export function BaseHeading({
  hLv,
  children,
  className,
  ...props
}: BaseHeadingProps) {
  const Heading = `h${hLv}` as ElementType;

  return (
    <Heading className={clsx(styles.heading, className)} {...props}>
      {children}
    </Heading>
  );
}
