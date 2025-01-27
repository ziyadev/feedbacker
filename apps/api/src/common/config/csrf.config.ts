import { doubleCsrf } from 'csrf-csrf';
import { sessionCookieConfig } from './sessoin.config';
export const { invalidCsrfTokenError, generateToken, validateRequest } =
  doubleCsrf({
    getSecret: () => process.env.CSRF_SECRET,
    cookieOptions: sessionCookieConfig,
  });
