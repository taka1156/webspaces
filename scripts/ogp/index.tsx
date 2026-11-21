/**
 * OGP 画像をビルド時に生成し public/ogp/ へ書き出す。
 * (旧 src/app/**\/opengraph-image.tsx の描画ロジックを移植したもの)
 *
 * vinext は動的セグメント配下の opengraph-image を prerender しないため、
 * Worker 実行時ではなくビルド時に静的ファイルとして生成する。
 */
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import type { ReactElement } from 'react';
import { ImageResponse } from 'next/og';
import { getArticles, getClassification } from '@/utils/ssg/brite';
import { OGP_SIZE, getOgpImageFilePath } from '@/utils/ogp';
import { LOGO_TEXT } from '@/constants/';

const PUBLIC_DIR = join(process.cwd(), 'public');

const readPublic = (path: string) => readFile(join(PUBLIC_DIR, path));

const toDataUrl = (data: Buffer, mime: string) =>
  `data:${mime};base64,${data.toString('base64')}`;

const mimeOf = (path: string) =>
  path.endsWith('.svg') ? 'image/svg+xml' : 'image/png';

type OgpSize = (typeof OGP_SIZE)[keyof typeof OGP_SIZE];
type ImageOptions = NonNullable<ConstructorParameters<typeof ImageResponse>[1]>;

const write = async (
  segments: string[],
  element: ReactElement,
  size: OgpSize,
  fonts?: ImageOptions['fonts']
) => {
  const response = new ImageResponse(element, { ...size, fonts });
  const outPath = join(PUBLIC_DIR, getOgpImageFilePath(segments));
  await mkdir(dirname(outPath), { recursive: true });
  await writeFile(outPath, Buffer.from(await response.arrayBuffer()));
};

/** 画像 1 枚を全面に敷くだけのアイコン系 OGP */
const renderIcon = async (
  segments: string[],
  imagePath: string,
  alt: string,
  backgroundColor?: string
) => {
  const src = toDataUrl(await readPublic(imagePath), mimeOf(imagePath));
  await write(
    segments,
    <img
      src={src}
      alt={alt}
      style={{
        ...(backgroundColor ? { backgroundColor } : {}),
        width: '100%',
        height: '100%',
        objectFit: 'cover'
      }}
    />,
    OGP_SIZE.icon
  );
};

const renderArticle = async (
  slug: string,
  title: string,
  assets: { font: Buffer; base: string; logo: string }
) => {
  await write(
    ['article', slug],
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        padding: 32,
        backgroundImage:
          'linear-gradient(135deg, #6495ED 0%, #8FB8F6 50%, #B8D4FA 100%)'
      }}
    >
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          color: 'white',
          padding: 32,
          fontFamily: 'Noto Sans JP'
        }}
      >
        <img
          src={assets.base}
          alt='article ogp image'
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: 16
          }}
        />
        <p style={{ marginTop: 64, fontSize: 56 }}>{title}</p>

        <div style={{ display: 'flex', alignItems: 'center', marginTop: 32 }}>
          <img
            src={assets.logo}
            alt={`${LOGO_TEXT} logo`}
            style={{ width: 64, height: 64, marginRight: 8 }}
          />
          <p style={{ fontSize: 40 }}>{LOGO_TEXT}</p>
        </div>
      </div>
    </div>,
    OGP_SIZE.large,
    [{ name: 'Noto Sans JP', data: assets.font, style: 'normal', weight: 700 }]
  );
};

export const generateOgpImages = async (): Promise<number> => {
  await rm(join(PUBLIC_DIR, 'ogp'), { recursive: true, force: true });

  const tasks: Promise<void>[] = [
    renderIcon(['top'], 'img/icon/utils/logo-no-title.png', 'top ogp image'),
    renderIcon(['categories'], 'img/ui/category.svg', 'category ogp image'),
    renderIcon(['tags'], 'img/ui/tag.svg', 'tags ogp image'),
    renderIcon(['profile'], 'img/ui/profile.svg', 'profile ogp image'),
    write(['teapot'], <div style={{ fontSize: '120px' }}>{'🫖'}</div>, OGP_SIZE.icon)
  ];

  const [tags, categories] = await Promise.all([
    getClassification('blog', 'tag'),
    getClassification('blog', 'category')
  ]);
  for (const { name, image } of tags) {
    tasks.push(
      renderIcon(['tag', name], image || 'img/ui/tag.svg', 'tag ogp image')
    );
  }
  for (const { name, image } of categories) {
    tasks.push(
      renderIcon(
        ['category', name],
        image || 'img/ui/category.svg',
        'category ogp image',
        'white'
      )
    );
  }

  const [font, base, logo] = await Promise.all([
    readPublic('fonts/NotoSansJP-Bold.ttf'),
    readPublic('img/ogp/pablo-ogp.png'),
    readPublic('img/icon/utils/logo-no-title.png')
  ]);
  const assets = {
    font,
    base: toDataUrl(base, 'image/png'),
    logo: toDataUrl(logo, 'image/png')
  };
  for (const { summary } of await getArticles('blog')) {
    tasks.push(renderArticle(summary.slug, summary.title, assets));
  }

  await Promise.all(tasks);
  return tasks.length;
};
