import { getBaseUrl } from '@/utils/site';

const BASE_URL = getBaseUrl();

const LOGO_TEXT = 'Webspaces';

const ROUTES: RouteItems = [
  {
    name: 'Top',
    href: '/',
    img: '/img/ui/home.svg'
  },
  {
    name: 'Category',
    href: '/categories/',
    img: '/img/ui/category.svg'
  },
  {
    name: 'Tag',
    href: '/tags/',
    img: '/img/ui/tag.svg'
  },
  {
    name: 'Profile',
    href: '/profile/',
    img: '/img/ui/profile.svg'
  }
];

const COPYRIGHT_URL = 'https://policy.taka1156.site/';

const SNS_ICONS: BlogSnsIcons = [
  {
    name: 'GitHub',
    img: '/img/icon/services/github-logo.png',
    monochrome: true,
    link: 'https://github.com/taka1156'
  },
  {
    name: 'Qiita',
    img: '/img/icon/services/qiita-logo.png',
    link: 'https://qiita.com/taka_1156'
  },
  {
    name: 'x',
    img: '/img/icon/services/x-logo.png',
    monochrome: true,
    link: 'https://x.com/taka_1156'
  },
  {
    name: 'Zenn',
    img: '/img/icon/services/zenn-logo.png',
    link: 'https://zenn.dev/taka_1156'
  },
  {
    name: 'Portfolio',
    img: '/img/icon/utils/prof.png',
    link: 'https://www.taka1156.site'
  }
];

const PROFILE: BlogProfile = {
  img: '/img/icon/utils/prof2.png',
  introduce:
    'Webエンジニア経験は6年目になります。最近は、GoやReact系技術を中心に活動しています。'
};

const GITHUB_CONTRIBUTION_IMG: CommonImg = {
  src: 'https://ghchart.rshah.org/taka1156',
  alt: "taka1156's Github chart"
};

const GITHUB_STATUS: BlogGitHubStatus = {
  statusUrl:
    'https://github-readme-stats.vercel.app/api?username=taka1156&count_private=true&show_icons=true&hide_border=true&bg_color=white',
  usedLangUrl:
    'https://github-readme-stats.vercel.app/api/top-langs/?username=taka1156&layout=compact&hide_border=true&bg_color=white',
  // ダークモード用（背景・文字色をテーマトークンに合わせる）
  darkStatusUrl:
    'https://github-readme-stats.vercel.app/api?username=taka1156&count_private=true&show_icons=true&hide_border=true&bg_color=14171c&title_color=8fb3f5&text_color=e6e8eb&icon_color=8fb3f5',
  darkUsedLangUrl:
    'https://github-readme-stats.vercel.app/api/top-langs/?username=taka1156&layout=compact&hide_border=true&bg_color=14171c&title_color=8fb3f5&text_color=e6e8eb',
  imgAlt: 'github status'
};

export {
  BASE_URL,
  LOGO_TEXT,
  ROUTES,
  COPYRIGHT_URL,
  SNS_ICONS,
  PROFILE,
  GITHUB_CONTRIBUTION_IMG,
  GITHUB_STATUS
};
