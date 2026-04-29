/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CRM_API_BASE_URL?: string;
  readonly VITE_CRM_APP_ORIGIN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
