import { BaseImg } from '@/components/shared/BaseImg/BaseImg';
import { styles } from './GithubStatus.css';

type GithubStatusProps = {
  githubStatus: BlogGitHubStatus;
};

export function GithubStatus({ githubStatus }: GithubStatusProps) {
  const { statusUrl, usedLangUrl, imgAlt } = githubStatus;
  return (
    <div className={styles.githubStatus}>
      <BaseImg src={statusUrl} alt={imgAlt} className={styles.githubStatusImg} />
      <BaseImg src={usedLangUrl} alt={imgAlt} className={styles.githubStatusImg} />
    </div>
  );
}
