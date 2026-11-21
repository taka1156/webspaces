import { describe, it, expect, vi, afterEach } from 'vitest';
import { getBaseUrl } from './index';

describe('getBaseUrl', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('BASE_URL が設定されている場合はその値を返す', () => {
    vi.stubEnv('BASE_URL', 'https://base.example.com');
    expect(getBaseUrl()).toBe('https://base.example.com');
  });

  it('BASE_URL の末尾スラッシュは取り除く', () => {
    vi.stubEnv('BASE_URL', 'https://base.example.com/');
    expect(getBaseUrl()).toBe('https://base.example.com');
  });

  it('本番環境で BASE_URL が未設定の場合はエラーを投げる', () => {
    vi.stubEnv('BASE_URL', '');
    vi.stubEnv('NODE_ENV', 'production');
    expect(() => getBaseUrl()).toThrow('BASE_URL is not set');
  });

  it('本番環境以外で BASE_URL が未設定の場合は localhost を返す', () => {
    vi.stubEnv('BASE_URL', '');
    vi.stubEnv('NODE_ENV', 'development');
    expect(getBaseUrl()).toBe('http://localhost:3000');
  });
});
