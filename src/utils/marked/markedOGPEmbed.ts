import type { MarkedExtension, Tokens } from 'marked';

interface OgpCardToken extends Tokens.Generic {
  type: 'ogpCard';
  url: string;
}

// 「(先頭 or 直前が空行) + URL + (直後が空行 or 末尾)」を要求する
const ISOLATED_URL_START = /(^|\n\n)(https?:\/\/[^\s<]+)[ \t]*(?=\n\n|\n?$)/;
const ISOLATED_URL_TOKEN = /^(https?:\/\/[^\s<]+)[ \t]*(?:\n(?=\n)|\n$|$)/;

const escapeAttr = (str: string): string =>
  str.replace(/&/g, '&amp;').replace(/"/g, '&quot;');

const markedOgpCard = (): MarkedExtension => ({
  extensions: [
    {
      name: 'ogpCard',
      level: 'block',

      start(src) {
        const match = ISOLATED_URL_START.exec(src);
        if (!match) {
          return undefined;
        }
        // グループ1(先頭 or "\n\n")の長さぶんずらして、URL自体の開始位置を返す
        return match.index + match[1].length;
      },

      tokenizer(src) {
        // 呼び出し時点で既に「ブロック境界」にいる前提なので ^ から始まればOK
        // ただし後方は「空行 or 文字列末尾」のみ許可(単一改行だけでは不可)
        const match = ISOLATED_URL_TOKEN.exec(src);
        if (!match) {
          return undefined;
        }

        const token: OgpCardToken = {
          type: 'ogpCard',
          raw: match[0],
          url: match[1]
        };
        return token;
      },

      renderer(token) {
        const t = token as OgpCardToken;
        const escapedUrl = escapeAttr(t.url);
        return `<div style="margin: 4px;"><ogp-card backend-url="${process.env.NEXT_PUBLIC_OGP_BACKEND_URL}/api/ogp" url="${escapedUrl}"></ogp-card></div>\n`;
      }
    }
  ]
});

export default markedOgpCard;
