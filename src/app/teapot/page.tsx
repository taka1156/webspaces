import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { BASE_URL } from '@/constants';
import { OGP_SIZE, buildOgpImage } from '@/utils/ogp';

export const generateMetadata = (): Metadata => {
  const URL = `${BASE_URL}/teapot/`;

  // メタタグ
  const title = 'ティーポット';
  const description = "418 I'm a teapot";
  const type = 'article';
  const url = URL;

  return {
    title: title,
    description: description,
    openGraph: {
      type: type,
      title: title,
      description: description,
      url: url,
      images: [
        buildOgpImage(BASE_URL, ['teapot'], OGP_SIZE.icon, 'teapot ogp image')
      ]
    },
    twitter: {
      card: 'summary'
    }
  };
};

export default function Teapot() {
  redirect('https://teapot.taka1156.site');
}
