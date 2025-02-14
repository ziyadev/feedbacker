export const PLANS = [
  {
    name: 'Free',
    tagline: 'For hobby & side projects',
    price: {
      monthly: 0,
      yearly: 0,
    },
    limits: {
      links: 25,
      clicks: 1000,
      domains: 3,
      tags: 5,
      users: 1,
      ai: 10,
      api: 60,
    },
    colors: {
      bg: 'bg-black',
      text: 'text-black',
    },
    cta: {
      text: 'Start for free',
      href: 'https://app.dub.co/register',
      color: 'bg-black hover:bg-gray-800 hover:ring-gray-200',
    },
    featureTitle: "What's included:",
    features: [
      { text: '25 new links/mo' },
      {
        text: '1K tracked clicks/mo',
      },
      { text: '30-day analytics retention' },
      { text: '3 custom domains' },
      { text: '1 user' },
      {
        text: 'Advanced analytics',
        footnote: {
          title:
            'Get location (country, city, continent), device (type, browser, OS), and referer data on your clicks.',
          cta: 'Learn more.',
          href: 'https://dub.co/help/article/dub-analytics',
        },
      },
      { text: '10 AI credits/mo' },
      {
        text: 'Basic support',
      },
      {
        text: 'API Access',
        footnote: {
          title: 'Programatically manage your links using our REST API.',
          cta: 'Learn more.',
          href: 'https://dub.co/docs/api-reference/introduction',
        },
      },
    ],
  },
  {
    name: 'Pro',
    tagline: 'For startups & small businesses',
    link: 'https://dub.co/help/article/pro-plan',
    price: {
      monthly: 24,
      yearly: 19,
      ids: [
        'price_1LodNLAlJJEpqkPVQSrt33Lc', // old monthly
        'price_1LodNLAlJJEpqkPVRxUyCQgZ', // old yearly
        'price_1OTcQBAlJJEpqkPViGtGEsbb', // new monthly (test)
        'price_1OYJeBAlJJEpqkPVLjTsjX0E', // new monthly (prod)
        'price_1OTcQBAlJJEpqkPVYlCMqdLL', // new yearly (test)
        'price_1OYJeBAlJJEpqkPVnPGEZeb0', // new yearly (prod)
      ],
    },
    limits: {
      links: 1000,
      clicks: 50000,
      domains: 10,
      tags: 25,
      users: 5,
      ai: 1000,
      api: 600,
    },
    colors: {
      bg: 'bg-blue-500',
      text: 'text-blue-500',
    },
    cta: {
      text: 'Get started with Pro',
      shortText: 'Get started',
      href: 'https://app.dub.co/register',
      color: 'bg-blue-600 hover:bg-blue-700 hover:ring-blue-100',
    },
    featureTitle: 'Everything in Free, plus:',
    features: [
      { text: '1,000 new links/mo' },
      {
        text: '50K tracked clicks/mo',
      },
      { text: '1-year analytics retention' },
      { text: '10 custom domains' },
      { text: '5 users' },
      {
        text: 'Advanced link features',
        footnote:
          'Custom social media cards, password-protected links, link expiration, link cloaking, device targeting, geo targeting etc.',
      },
      {
        text: 'Unlimited AI credits',
        footnote: {
          title:
            'Subject to fair use policy – you will be notified if you exceed the limit, which are high enough for frequent usage.',
          cta: 'Learn more.',
          href: 'https://dub.co/blog/introducing-dub-ai',
        },
      },
      {
        text: 'Priority support',
      },
      {
        text: 'Premium dub.link domain',
        footnote: {
          title: 'Stand out from the crowd with a premium dub.link domain.',
          cta: 'Learn more.',
          href: 'https://dub.co/help/article/default-dub-domains#premium-dublink-domain',
        },
      },
      {
        text: 'Complimentary custom domain',
        footnote: {
          title:
            'All our paid plans come with a free .link custom domain, which helps improve click-through rates.',
          cta: 'Learn more.',
          href: 'https://dub.co/help/article/free-dot-link-domain',
        },
      },
    ],
  },
] as const;

export const FREE_PLAN = PLANS[0];
export const PRO_PLAN = PLANS[1];

export const PUBLIC_PLANS = [FREE_PLAN, PRO_PLAN];

export const SELF_SERVE_PAID_PLANS = PLANS.filter((p) => p.name !== 'Free');

export const FREE_WORKSPACES_LIMIT = 2;

export const getPlanDetails = (plan: string) => {
  return SELF_SERVE_PAID_PLANS.find(
    (p) => p.name.toLowerCase() === plan.toLowerCase()
  );
};

export const getCurrentPlan = (plan: string) => {
  return (
    PLANS.find((p) => p.name.toLowerCase() === plan.toLowerCase()) || FREE_PLAN
  );
};

export const getNextPlan = (plan?: string | null) => {
  if (!plan) return PRO_PLAN;
  return PLANS[
    PLANS.findIndex((p) => p.name.toLowerCase() === plan.toLowerCase()) + 1
  ];
};
