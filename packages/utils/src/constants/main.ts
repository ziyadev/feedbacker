export const APP_NAME = process.env['NEXT_PUBLIC_APP_NAME'] || 'FeedBacker.io';

export const SHORT_DOMAIN =
  process.env['NEXT_PUBLIC_APP_SHORT_DOMAIN'] || 'feedbacker.io';

export const HOME_DOMAIN = `https://${process.env['NEXT_PUBLIC_APP_DOMAIN']}`;

export const HOST_NAME = process.env['NEXT_PUBLIC_HOST_NAME'];

export const APP_HOSTNAMES = new Set([
  `app.${process.env['NEXT_PUBLIC_APP_DOMAIN']}`,
  `preview.${process.env['NEXT_PUBLIC_APP_DOMAIN']}`,
  'localhost:8888',
  'localhost',
]);

export const APP_DOMAIN =
  process.env['NODE_ENV'] === 'production'
    ? `https://app.${process.env['NEXT_PUBLIC_APP_DOMAIN']}`
    : process.env['NODE_ENV'] === 'test'
    ? `https://preview.${process.env['NEXT_PUBLIC_APP_DOMAIN']}`
    : 'http://localhost:8888';

export const APP_DOMAIN_WITH_NGROK =
  process.env['NODE_ENV'] === 'production'
    ? `https://app.${process.env['NEXT_PUBLIC_APP_DOMAIN']}`
    : process.env['NODE_ENV'] === 'test'
    ? `https://preview.${process.env['NEXT_PUBLIC_APP_DOMAIN']}`
    : 'http://localhost:8888';

export const API_HOSTNAMES = new Set([
  `api.${process.env['NEXT_PUBLIC_APP_DOMAIN']}`,
  `api-staging.${process.env['NEXT_PUBLIC_APP_DOMAIN']}`,
  `api.${SHORT_DOMAIN}`,
  'api.localhost:8888',
]);

export const API_DOMAIN =
  process.env['NODE_ENV'] === 'production'
    ? `https://api.${process.env['NEXT_PUBLIC_APP_DOMAIN']}`
    : process.env['NODE_ENV'] === 'test'
    ? `https://api-staging.${process.env['NEXT_PUBLIC_APP_DOMAIN']}`
    : 'http://api.localhost:8888';

export const ADMIN_HOSTNAMES = new Set([
  `admin.${process.env['NEXT_PUBLIC_APP_DOMAIN']}`,
  'admin.localhost:8888',
]);

export const PARTNERS_DOMAIN =
  process.env['NODE_ENV'] === 'production'
    ? `https://partners.${process.env['NEXT_PUBLIC_APP_DOMAIN']}`
    : process.env['NODE_ENV'] === 'test'
    ? `https://partners-staging.${process.env['NEXT_PUBLIC_APP_DOMAIN']}`
    : 'http://partners.localhost:8888';

export const PARTNERS_HOSTNAMES = new Set([
  `partners.${process.env['NEXT_PUBLIC_APP_DOMAIN']}`,
  `partners-staging.${process.env['NEXT_PUBLIC_APP_DOMAIN']}`,
  'partners.localhost:8888',
]);

export const FEEDBACKER_LOGO = '';
export const FEEDBACKER_QR_LOGO = '';
export const FEEDBACKER_WORDMARK = '';
export const FEEDBACKER_THUMBNAIL = '';

export const FEEDBACKER_WORKSPACE_ID = '';
export const ACME_WORKSPACE_ID = '';
export const LEGAL_WORKSPACE_ID = '';
export const LEGAL_USER_ID = '';

export const R2_URL = process.env['STORAGE_BASE_URL'] as string;
