/**
 * ビルド時に生成する OGP 画像 (public/ogp/**.png) のパス・メタデータを扱う。
 * 生成スクリプト (scripts/ogp) と各ページの generateMetadata で共有する。
 */

const OGP_DIR = 'ogp';

export const OGP_SIZE = {
  large: { width: 1200, height: 630 },
  icon: { width: 128, height: 128 }
} as const;

type OgpSize = (typeof OGP_SIZE)[keyof typeof OGP_SIZE];

const assertSegments = (segments: string[]): void => {
  if (segments.length === 0) {
    throw new Error('OGP image segments must not be empty');
  }
  for (const segment of segments) {
    if (!segment || segment === '.' || segment === '..' || segment.includes('/')) {
      throw new Error(`Invalid OGP image segment: "${segment}"`);
    }
  }
};

/** public/ からの相対ファイルパス (生成時の書き出し先) */
export const getOgpImageFilePath = (segments: string[]): string => {
  assertSegments(segments);
  return `${OGP_DIR}/${segments.join('/')}.png`;
};

/** 配信される URL パス (各セグメントは URL エンコードする) */
export const getOgpImagePath = (segments: string[]): string => {
  assertSegments(segments);
  return `/${OGP_DIR}/${segments.map(encodeURIComponent).join('/')}.png`;
};

/** Metadata の openGraph.images に渡す値 */
export const buildOgpImage = (
  baseUrl: string,
  segments: string[],
  size: OgpSize,
  alt: string
) => ({
  url: `${baseUrl}${getOgpImagePath(segments)}`,
  width: size.width,
  height: size.height,
  alt,
  type: 'image/png'
});
