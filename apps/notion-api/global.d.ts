declare namespace NodeJS {
  export interface ProcessEnv {
    NOTION_TOKEN: string
    API_SECRET_KEY: string
    SEND_GRID_API_KEY: string
    SEND_EMAIL_FROM: string
    SEND_EMAIL_TO: string
    VERCEL_ENV: 'production' | 'development' | 'preview'
    VERCEL_URL: string
  }
}
