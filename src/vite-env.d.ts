/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_URI_SERVER: string;
  readonly VITE_APP_FILE_SERVER: string;
  readonly VITE_APP_INSTAGRAM_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
