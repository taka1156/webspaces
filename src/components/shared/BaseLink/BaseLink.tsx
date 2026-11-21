import Link from 'next/link';
import clsx from 'clsx';
import { styles } from './BaseLink.css';

type BaseLinkProps = {
  /** リンク先のURL */
  href: string;
  /** enableNewTabをtrueにすると、新しいタブでリンクを開く */
  enableNewTab?: boolean;
} & Omit<React.ComponentProps<'a'>, 'ref'>;

/**
 * リンクを表示するコンポーネント
 *
 * 内部リンクと外部リンクを判定して適切なタグを使用
 *
 * enableNewTabをtrueにすると、新しいタブでリンクを開く
 */
export function BaseLink({
  href,
  className,
  children,
  enableNewTab,
  ...props
}: BaseLinkProps) {
  const classes = clsx(styles.link, className);

  const isInternalLink = () => {
    /**
     * ルーティングか、外部リンクどちらか判定する。
     * httpを含まなければ、内部リンク
     */
    return href.indexOf('http') === -1;
  };

  if (isInternalLink()) {
    if (enableNewTab) {
      props.target = '_blank';
      props.rel = 'noopener noreferrer';
    }

    /* 内部リンク */
    return (
      <Link {...props} href={href} className={classes}>
        {children}
      </Link>
    );
  } else {
    /* 外部リンク */
    return (
      <a
        {...props}
        href={href}
        target='_blank'
        rel='noopener noreferrer'
        className={classes}
      >
        {children}
      </a>
    );
  }
}
