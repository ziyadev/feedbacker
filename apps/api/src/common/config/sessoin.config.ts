import { WorkspaceMemberRole } from '@/modules/workspace/model/workspace-member.model';
import { HOST_NAME } from '@repo/utils';
import { CookieOptions } from 'express';
import _session from 'express-session';
import { redisStore } from './redis-store.config';
export interface UserSessionData {
  id: string;
  email: string;
  emailVerified: boolean;
  planId: string;
}
export interface WorkspaceSessionData {
  id: string;
  role: WorkspaceMemberRole;
}

declare module 'express-session' {
  interface SessionData {
    user: UserSessionData;
    workspace: WorkspaceSessionData;
  }
}

export const sessionCookieConfig: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  domain: process.env.NODE_ENV === 'production' ? `.${HOST_NAME}` : undefined,
  maxAge: 1000 * 60 * 60 * 24 * 90, // 90 days
  sameSite: 'strict',
};

export const sessionConfig = {
  name: 'x-session',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: sessionCookieConfig,
  store: redisStore,
};

export const session = _session(sessionConfig);
