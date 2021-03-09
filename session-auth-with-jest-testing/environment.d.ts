declare global {
   namespace NodeJS {
      interface ProcessEnv {
         NODE_ENV: 'development' | 'test' | 'production';
         PORT: number;
         REDIS_HOST: string;
         REDIS_PORT: number;
         MONGODB_URL: string;
         SESSION_SECRET: string;
         SESSION_EXPIRY: number;
         CACHE_EXPIRY: number;
         
      }
   }
}

declare module 'express-session' {
   interface SessionData {
     userId: string;
   }
 }

export {}