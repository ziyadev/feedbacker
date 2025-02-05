export const siteConfig = {
  name: 'Dashboard',
  url: 'https://dashboard.tremor.so',
  description: 'The only dashboard you will ever need.',
  baseLinks: {
    home: '/',
    overview: '/dashboard/overview',
    quickstart: '/dashboard/quickstart',
    webhooks: '/dashboard/webhooks',
    apikeys: '/dashboard/apikeys',
    feedback: '/dashboard/feedback',
    settings: '/dashboard/settings',
  },
  externalLink: {
    blocks: 'https://blocks.tremor.so/templates#dashboard',
  },
};

export type siteConfig = typeof siteConfig;
