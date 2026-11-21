// marked-details.ts
import type { MarkedExtension, Tokens } from 'marked';

interface DetailsToken extends Tokens.Generic {
  type: 'details';
  titleTokens: Tokens.Generic[];
  open: boolean;
  tokens: Tokens.Generic[];
}

const OPEN_TAG = /^ {0,3}:::details(?:\{open\})?(?:[ \t]+(.*))?$/;
const CLOSE_TAG = /^ {0,3}:::[ \t]*$/;

const markedDetails = (): MarkedExtension => ({
  extensions: [
    {
      name: 'details',
      level: 'block',
      start(src) {
        return src.match(/^:::details/)?.index;
      },
      tokenizer(src) {
        const lines = src.split('\n');
        const openMatch = OPEN_TAG.exec(lines[0]);
        if (!openMatch) {
          return undefined;
        }

        let depth = 1;
        let endLine = -1;
        for (let i = 1; i < lines.length; i++) {
          if (OPEN_TAG.test(lines[i])) {
            depth++;
          } else if (CLOSE_TAG.test(lines[i])) {
            depth--;
            if (depth === 0) {
              endLine = i;
              break;
            }
          }
        }
        if (endLine === -1) {
          return undefined;
        }

        const raw = lines.slice(0, endLine + 1).join('\n');
        const body = lines.slice(1, endLine).join('\n');
        const title = (openMatch[1] ?? '').trim() || 'Details';

        const token: DetailsToken = {
          type: 'details',
          raw,
          titleTokens: this.lexer.inlineTokens(title),
          open: lines[0].includes('{open}'),
          tokens: []
        };

        this.lexer.blockTokens(body, token.tokens);
        return token;
      },
      renderer(token) {
        const t = token as DetailsToken;
        const body = this.parser.parse(t.tokens);
        const summary = this.parser.parseInline(t.titleTokens);

        return `<details${t.open ? ' open' : ''}>\n<summary>${summary}</summary>\n\n${body}</details>\n`;
      }
    }
  ]
});

export default markedDetails;
