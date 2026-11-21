import clsx from 'clsx';
import { BaseImg } from '@/components/shared/BaseImg/BaseImg';
import { themeVisibility } from '@/constants/theme.css';
import { styles } from './GithubStatus.css';

type GithubStatusProps = {
  githubStatus: BlogGitHubStatus;
};

/**
 * GitHub のステータス画像を表示するコンポーネント
 *
 * ライト/ダーク用の画像を両方描画し、data-theme を参照するCSSで表示を切り替える
 */
export function GithubStatus({ githubStatus }: GithubStatusProps) {
  const { statusUrl, usedLangUrl, darkStatusUrl, darkUsedLangUrl, imgAlt } =
    githubStatus;
  const lightImgClass = clsx(styles.githubStatusImg, themeVisibility.lightOnly);
  const darkImgClass = clsx(styles.githubStatusImg, themeVisibility.darkOnly);

  return (
    <div className={styles.githubStatus}>
      <BaseImg
        src={statusUrl}
        alt={imgAlt}
        className={lightImgClass}
        loading='lazy'
      />
      <BaseImg
        src={usedLangUrl}
        alt={imgAlt}
        className={lightImgClass}
        loading='lazy'
      />
      <BaseImg
        src={darkStatusUrl}
        alt={imgAlt}
        className={darkImgClass}
        loading='lazy'
      />
      <BaseImg
        src={darkUsedLangUrl}
        alt={imgAlt}
        className={darkImgClass}
        loading='lazy'
      />
    </div>
  );
}
