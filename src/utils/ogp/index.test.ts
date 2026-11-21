import { describe, it, expect } from 'vitest';
import {
  OGP_SIZE,
  buildOgpImage,
  getOgpImageFilePath,
  getOgpImagePath
} from './index';

describe('getOgpImageFilePath', () => {
  it('セグメントを結合した public/ からの相対パスを返す', () => {
    expect(getOgpImageFilePath(['article', 'abc'])).toBe('ogp/article/abc.png');
  });

  it('マルチバイト文字はエンコードせずに返す', () => {
    expect(getOgpImageFilePath(['tag', '日本語'])).toBe('ogp/tag/日本語.png');
  });
});

describe('getOgpImagePath', () => {
  it('先頭スラッシュ付きの URL パスを返す', () => {
    expect(getOgpImagePath(['top'])).toBe('/ogp/top.png');
  });

  it('各セグメントを URL エンコードする', () => {
    expect(getOgpImagePath(['tag', 'C# 入門'])).toBe(
      '/ogp/tag/C%23%20%E5%85%A5%E9%96%80.png'
    );
  });

  describe('不正なセグメントの場合', () => {
    it.each([[[]], [['']], [['.']], [['..']], [['a/b']]])(
      '%j はエラーを投げる',
      (segments) => {
        expect(() => getOgpImagePath(segments)).toThrow();
      }
    );
  });
});

describe('buildOgpImage', () => {
  it('baseUrl と URL パスを結合したメタデータを返す', () => {
    expect(
      buildOgpImage(
        'https://example.com',
        ['article', 'abc'],
        OGP_SIZE.large,
        'alt text'
      )
    ).toEqual({
      url: 'https://example.com/ogp/article/abc.png',
      width: 1200,
      height: 630,
      alt: 'alt text',
      type: 'image/png'
    });
  });
});
