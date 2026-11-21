declare module 'process' {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        readonly NEXT_PUBLIC_BASE_URL: string;
        readonly MICRO_CMS: string;
        readonly ARTICLE_URL: string;
        readonly TAG_URL: string;
        readonly CATEGORY_URL: string;
        readonly FIREBASE_TOKEN: string;
      }
    }
  }
}
