export type Usage = {
  endpoint: string;
  status: string;
  costs: number;
  region: string;
  stability: number;
  lastEdited: string;
  createdAt: string;
};

export type OverviewData = {
  date: string;
  'Rows written': number;
  'Rows read': number;
  Queries: number;
  'Payments completed': number;
  'Sign ups': number;
  Logins: number;
  'Sign outs': number;
  'Support calls': number;
};
