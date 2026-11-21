import { Metadata } from 'next';
import { BaseHeading } from '@/components/shared/BaseHeading/BaseHeading';
import { ContributionBox } from '@/components/profile/ContributionBox/ContributionBox';
import { ProfileBox } from '@/components/profile/ProfileBox/ProfileBox';
import { DevelopmentCard } from '@/components/profile/DevelopmentCard/DevelopmentCard';
import { SnsIcons } from '@/components/profile/SnsIcons/SnsIcons';
import { getArticles } from '@/utils/ssg/brite';
import { BASE_URL, GITHUB_CONTRIBUTION_IMG, PROFILE, SNS_ICONS } from '@/constants/';
import { OGP_SIZE, buildOgpImage } from '@/utils/ogp';
import { styles } from './page.css';

const getStaticArticles = async () => {
  return await getArticles('portfolio');
};

export const generateMetadata = async (): Promise<Metadata> => {
  const title = 'プロフィール';
  const description =
    'taka1156のプロフィール。\nVueやTS、electron、Laravelなど技術関連の記事を更新中';
  const url = `${BASE_URL}/profile/`;

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: url,
      images: [
        buildOgpImage(BASE_URL, ['profile'], OGP_SIZE.icon, 'profile ogp image')
      ],
      type: 'article'
    },
    twitter: {
      card: 'summary'
    }
  };
};

export default async function Profile() {
  const articles = await getStaticArticles();

  return (
    <div className={styles.container}>
      <BaseHeading hLv='1' className={styles.profileHeading}>
        Profile
      </BaseHeading>

      <section className={styles.contents}>
        <BaseHeading hLv='2' className={styles.profileSubHeading}>
          自己紹介
        </BaseHeading>
        <ProfileBox profile={PROFILE} />
      </section>

      <section className={styles.contents}>
        <BaseHeading hLv='2' className={styles.profileSubHeading}>
          Githubの活動
        </BaseHeading>
        <ContributionBox githubContribution={GITHUB_CONTRIBUTION_IMG} />
      </section>

      {/* <section className={styles.contents}>
        <BaseHeading hLv='2' className={styles.profileSubHeading}>
          Github Status
        </BaseHeading>
        <GithubStatus githubStatus={GITHUB_STATUS} />
      </section> */}

      <section className={styles.contents}>
        <BaseHeading hLv='2' className={styles.profileSubHeading}>
          制作物
        </BaseHeading>
        <div className={styles.cardList}>
          {articles.map((article, index) => (
            <DevelopmentCard key={index} index={index} article={article} />
          ))}
        </div>
      </section>

      <section className={styles.contents}>
        <BaseHeading hLv='2' className={styles.profileSubHeading}>
          SNSやGitHub等
        </BaseHeading>
        <SnsIcons snsIcons={SNS_ICONS} />
      </section>
    </div>
  );
}
