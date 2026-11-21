export function getBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_BASE_URL;

  if (url) {
    return url.replace(/\/$/, '');
  }

  if (process.env.NODE_ENV === 'production') {
    throw new Error('NEXT_PUBLIC_BASE_URL is not set');
  }

  return 'http://localhost:3000';
}
