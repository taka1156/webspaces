import { readFile } from 'node:fs/promises';
import { extname, join, normalize, sep } from 'node:path';

// 相対輝度がこの値以下なら「黒系」とみなす（#1A1918 ≒ 0.01、#333 ≒ 0.03）
const DARK_LUMINANCE_THRESHOLD = 0.05;

const COLOR_PATTERN = /(?:fill|stroke|stop-color)\s*(?:=\s*["']|:\s*)([^"';>]+)/gi;

const NAMED_DARK_COLORS = new Set(['black', 'currentcolor']);
const IGNORED_COLORS = new Set(['none', 'transparent', 'inherit']);

const parseHex = (hex: string): [number, number, number] | undefined => {
  const value = hex.slice(1);
  if (value.length === 3 || value.length === 4) {
    return [0, 1, 2].map((i) => parseInt(value[i] + value[i], 16)) as [
      number,
      number,
      number
    ];
  }
  if (value.length === 6 || value.length === 8) {
    return [0, 2, 4].map((i) => parseInt(value.slice(i, i + 2), 16)) as [
      number,
      number,
      number
    ];
  }
  return undefined;
};

const parseRgb = (rgb: string): [number, number, number] | undefined => {
  const values = rgb
    .match(/[\d.]+/g)
    ?.slice(0, 3)
    .map(Number);
  return values && values.length === 3
    ? (values as [number, number, number])
    : undefined;
};

const relativeLuminance = ([r, g, b]: [number, number, number]) => {
  const toLinear = (v: number) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
};

/** 色の値が黒系かどうか（判定できない値は黒系ではないとみなす） */
const isDarkColor = (raw: string): boolean => {
  const color = raw.trim().toLowerCase();
  if (NAMED_DARK_COLORS.has(color)) return true;

  const rgb = color.startsWith('#')
    ? parseHex(color)
    : color.startsWith('rgb')
      ? parseRgb(color)
      : undefined;

  return rgb !== undefined && relativeLuminance(rgb) <= DARK_LUMINANCE_THRESHOLD;
};

/**
 * SVG文字列が黒系の単色かどうかを判定する
 *
 * - fill / stroke / stop-color の指定がすべて黒系 → mono
 * - 色指定が1つもない → SVGの既定色(黒)で描画されるため mono
 * - グラデーション・<style>・埋め込み画像など色を特定できない場合 → color
 */
export const detectSvgTone = (svg: string): ImageTone => {
  if (/<style|<image|<foreignObject/i.test(svg)) return 'color';

  const colors = [...svg.matchAll(COLOR_PATTERN)]
    .map(([, value]) => value.trim())
    .filter((value) => !IGNORED_COLORS.has(value.toLowerCase()));

  return colors.every(isDarkColor) ? 'mono' : 'color';
};

const cache = new Map<string, Promise<ImageTone>>();

const loadImageTone = async (imagePath: string): Promise<ImageTone> => {
  // 外部URLやSVG以外（PNG等）は解析しない
  if (!imagePath.startsWith('/') || extname(imagePath).toLowerCase() !== '.svg') {
    return 'color';
  }

  const publicDir = join(process.cwd(), 'public');
  const filePath = normalize(join(publicDir, imagePath));
  if (!filePath.startsWith(publicDir + sep)) return 'color';

  try {
    return detectSvgTone(await readFile(filePath, 'utf-8'));
  } catch {
    return 'color';
  }
};

/**
 * public 配下の画像（brite から sync された画像）のトーンを返す
 *
 * ビルド時に実ファイルを解析するため、sync で画像が差し替わっても追従する
 */
export const getImageTone = (imagePath: string): Promise<ImageTone> => {
  const cached = cache.get(imagePath);
  if (cached) return cached;

  const tone = loadImageTone(imagePath);
  cache.set(imagePath, tone);
  return tone;
};
