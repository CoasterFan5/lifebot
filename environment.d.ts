declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_URL: string;
      TOKEN: string;
      APP_ID: string;
      DEPLOY_TO_GUILD: string | undefined;
      DISABLE_BOT: "true" | "false";
    }
  }
}

export {};
