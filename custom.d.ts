declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production'
    HASH_SALT: string
    DATABASE_URL: string
  }
}
