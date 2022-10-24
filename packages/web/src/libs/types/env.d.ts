/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_CLIENT_ID: string;
  readonly VITE_GOOGLE_CLIENT_SECRET: string;
  readonly VITE_SERVER_ORIGIN: string;
  readonly VITE_WS_ORIGIN: string;
  readonly VITE_MNT: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
