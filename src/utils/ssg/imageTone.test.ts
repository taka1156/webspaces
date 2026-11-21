import { describe, it, expect, vi, beforeEach } from 'vitest';
import { readFile } from 'node:fs/promises';
import { detectSvgTone, getImageTone } from './imageTone';

vi.mock('node:fs/promises');

const svg = (body: string, attrs = '') =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ${attrs}>${body}</svg>`;

describe('detectSvgTone', () => {
  it.each([
    ['ルートの fill が #000', svg('<path d="M0 0h24v24H0z"/>', 'fill="#000"')],
    ['fill が #000000', svg('<path fill="#000000" d="M0 0"/>')],
    ['黒に近い色 (#1A1918)', svg('<path fill="#1A1918" d="M0 0"/>')],
    ['black キーワード', svg('<path fill="black" d="M0 0"/>')],
    ['style 属性の rgb()', svg('<path style="fill:rgb(0, 0, 0)" d="M0 0"/>')],
    ['色指定なし（既定色の黒）', svg('<path d="M0 0"/>')],
    [
      'fill="none" は無視する',
      svg('<path fill="none" d="M0 0"/><path fill="#000" d="M1 1"/>')
    ]
  ])('%s のとき mono', (_, source) => {
    expect(detectSvgTone(source)).toBe('mono');
  });

  it.each([
    ['カラーの fill', svg('<path fill="#00D8FF" d="M0 0"/>')],
    [
      '黒と白の組み合わせ',
      svg('<path fill="#1A1918" d="M0 0"/><path fill="#FFFFFF" d="M1 1"/>')
    ],
    [
      '黒と黄色の組み合わせ',
      svg('<path fill="#000000" d="M0 0"/><path fill="#F7DF1E" d="M1 1"/>')
    ],
    ['グラデーション参照', svg('<path fill="url(#grad)" d="M0 0"/>')],
    [
      '<style> による色指定',
      svg('<style>.a{fill:#000}</style><path class="a" d="M0 0"/>')
    ]
  ])('%s のとき color', (_, source) => {
    expect(detectSvgTone(source)).toBe('color');
  });

  it('fill-rule などの属性名を色として扱わない', () => {
    expect(
      detectSvgTone(svg('<path fill-rule="evenodd" fill="#000" d="M0 0"/>'))
    ).toBe('mono');
  });
});

describe('getImageTone', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('public 配下の SVG を読み込んで判定する', async () => {
    vi.mocked(readFile).mockResolvedValue(
      svg('<path d="M0 0"/>', 'fill="#000"') as never
    );
    await expect(getImageTone('/blog/images/test-mono.svg')).resolves.toBe('mono');
    expect(readFile).toHaveBeenCalledWith(
      expect.stringContaining('public/blog/images/test-mono.svg'),
      'utf-8'
    );
  });

  it('同じパスは結果をキャッシュし、再読み込みしない', async () => {
    vi.mocked(readFile).mockResolvedValue(
      svg('<path fill="#f00" d="M0 0"/>') as never
    );
    await getImageTone('/blog/images/test-cache.svg');
    await getImageTone('/blog/images/test-cache.svg');
    expect(readFile).toHaveBeenCalledTimes(1);
  });

  it.each([
    ['外部URL', 'https://example.com/logo.svg'],
    ['PNG', '/blog/images/logo.png'],
    ['public 外へのパス', '/../secret.svg']
  ])('%s は読み込まずに color を返す', async (_, path) => {
    await expect(getImageTone(path)).resolves.toBe('color');
    expect(readFile).not.toHaveBeenCalled();
  });

  it('読み込みに失敗したとき color を返す', async () => {
    vi.mocked(readFile).mockRejectedValue(new Error('not found'));
    await expect(getImageTone('/blog/images/missing.svg')).resolves.toBe('color');
  });
});
