declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
    PORT: string;
    CORS_ORIGIN: string;
    MONGO_URI: string;
    MONGO_DB_NAME: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_APPLICATION_CREDENTIALS: string;
    SESSION_SECRET: string;
    NODE_ENV: "production" | "development";
  }
}
