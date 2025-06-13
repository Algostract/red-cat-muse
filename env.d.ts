interface ImportMetaEnv {
  readonly NODE_ENV: 'development' | 'production'
  readonly NOTION_API_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
