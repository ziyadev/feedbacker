import { Env } from '@/common/config/env';
import { Request } from 'express';
export const buildOauthRedirectUrl = (request: Request): string => {
  let url = process.env.PUBLIC_BASE_APP_ORIGIN as Env['PUBLIC_BASE_APP_ORIGIN'];
  if (!request.user) {
    return `${url}/auth/sign-in?error=AuthenticationError`;
  }
  const redirectUrl = request.cookies['redirectUrl'];
  if (redirectUrl) return redirectUrl;

  if (request.user['isNew']) {
    url += '/onboarding';
  }
  url += '/dashboard';
  return url;
};
