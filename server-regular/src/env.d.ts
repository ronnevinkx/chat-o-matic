declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      NODE_ENV: string;
      WEB_CLIENT: string;
      DB_URI: string;
    }
  }
}

export {}
