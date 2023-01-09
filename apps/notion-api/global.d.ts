declare namespace NodeJS {
  export interface ProcessEnv {
    NOTION_TOKEN: string
    API_SECRET_KEY: string
    VERCEL_ENV: 'production' | 'development' | 'preview'
  }
}
