import { doubleCsrf } from 'csrf-csrf';
import { sessionCookieConfig } from './sessoin.config';
export const csrf = doubleCsrf({
  getSecret: () => process.env.CSRF_SECRET,
  cookieOptions: sessionCookieConfig,
});
