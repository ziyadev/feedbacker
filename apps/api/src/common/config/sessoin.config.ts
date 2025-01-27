import { RedisStore } from 'connect-redis';
import { CookieOptions } from 'express';
import session from 'express-session';
import { createClient } from 'redis';
export interface UserSessionData {
  id: string;
  email: string;
  emailVerified: boolean;
  rules: string[];
  permissions: string[];
  planId: string;
}

declare module 'express-session' {
  interface SessionData {
    user: UserSessionData;
  }
}

export const sessionCookieConfig: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  maxAge: 1000 * 60 * 60 * 24 * 90, // 90 days
  sameSite: 'lax',
};
// init redis client
const redisClient = createClient();
redisClient.connect().catch(console.error);
// init redis store
const redisStore = new RedisStore({
  client: redisClient,
  prefix: 'SESSION:',
});
export const sessionConfig = {
  name: 'x-session',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: sessionCookieConfig,
  store: redisStore,
};
