import { Env } from '@/common/config/env';
import { Request } from 'express';
export const buildOauthRedirectUrl = (request: Request): string => {
  let url = `${
    process.env.PUBLIC_BASE_FRONT_URL as Env['PUBLIC_BASE_FRONT_URL']
  }/auth/sign-in`;
  if (!request.user) {
    return `${url}?error=AuthenticationError`;
  }
  const redirectUrl = request.cookies['redirectUrl'];
  if (redirectUrl) {
    url = redirectUrl;
  }

  if (request.user['isNew']) {
    url += '&newUser=true';
  }

  const next = request.cookies['next'];

  if (next) {
    url += `&next=${next}`;
  }
  const invitationToken = request.cookies['invitationToken'];
  if (invitationToken) {
    url += `&invitationToken=${invitationToken}`;
  }

  return url;
};
