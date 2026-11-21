import { describe, it, expect, vi, afterEach } from 'vitest';
import { getBaseUrl } from './index';

describe('getBaseUrl', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('NEXT_PUBLIC_BASE_URL が設定されている場合はその値を返す', () => {
    vi.stubEnv('NEXT_PUBLIC_BASE_URL', 'https://base.example.com');
    expect(getBaseUrl()).toBe('https://base.example.com');
  });

  it('NEXT_PUBLIC_BASE_URL の末尾スラッシュは取り除く', () => {
    vi.stubEnv('NEXT_PUBLIC_BASE_URL', 'https://base.example.com/');
    expect(getBaseUrl()).toBe('https://base.example.com');
  });

  it('本番環境で NEXT_PUBLIC_BASE_URL が未設定の場合はエラーを投げる', () => {
    vi.stubEnv('NEXT_PUBLIC_BASE_URL', '');
    vi.stubEnv('NODE_ENV', 'production');
    expect(() => getBaseUrl()).toThrow('NEXT_PUBLIC_BASE_URL is not set');
  });

  it('本番環境以外で NEXT_PUBLIC_BASE_URL が未設定の場合は localhost を返す', () => {
    vi.stubEnv('NEXT_PUBLIC_BASE_URL', '');
    vi.stubEnv('NODE_ENV', 'development');
    expect(getBaseUrl()).toBe('http://localhost:3000');
  });
});
