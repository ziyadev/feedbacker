import { FeedbackPriority } from '@/graphql/graphql';
import { FeedbackStatus } from '@/graphql/types';
import { v4 as uuid } from 'uuid';
import { Usage } from './schema';
export const roles: { value: string; label: string }[] = [
  {
    value: 'admin',
    label: 'Admin',
  },
  {
    value: 'member',
    label: 'Member',
  },
  {
    value: 'viewer',
    label: 'Viewer',
  },
  {
    value: 'contributor',
    label: 'Contributor',
  },
];

export const statuses: { value: string; label: string; variant: string }[] = [
  {
    value: FeedbackStatus.Resolved,
    label: 'Resolved',
    variant: 'success',
  },
  {
    value: FeedbackStatus.Open,
    label: 'Open',
    variant: 'success',
  },
  {
    value: FeedbackStatus.Backlog,
    label: 'Backlog',
    variant: 'neutral',
  },
  {
    value: FeedbackStatus.Closed,
    label: 'Closed',
    variant: 'neutral',
  },
  {
    value: FeedbackStatus.InQa,
    label: 'InQa',
    variant: 'neutral',
  },
  {
    value: FeedbackStatus.Todo,
    label: 'Todo',
    variant: 'warning',
  },
];
export const priorities: { value: string; label: string; variant: string }[] = [
  {
    value: FeedbackPriority.Neutral,
    label: 'Neutral',
    variant: 'success',
  },
  {
    value: FeedbackPriority.Low,
    label: 'Low',
    variant: 'neutral',
  },

  {
    value: FeedbackPriority.Urgrgent,
    label: 'Urgent',
    variant: 'warning',
  },
  {
    value: FeedbackPriority.High,
    label: 'High',
    variant: 'warning',
  },
];

export const regions: { value: string; label: string }[] = [
  {
    value: 'US-West 1',
    label: 'US-West 1',
  },
  {
    value: 'US-West 2',
    label: 'US-West 2',
  },
  {
    value: 'US-East 1',
    label: 'US-East 1',
  },
  {
    value: 'US-East 2',
    label: 'US-East 2',
  },
  {
    value: 'EU-West 1',
    label: 'EU-West 1',
  },
  {
    value: 'EU-North 1',
    label: 'EU-North 1',
  },
  {
    value: 'EU-Central 1',
    label: 'EU-Central 1',
  },
];

export const conditions: { value: string; label: string }[] = [
  {
    value: 'is-equal-to',
    label: 'is equal to',
  },
  {
    value: 'is-between',
    label: 'is between',
  },
  {
    value: 'is-greater-than',
    label: 'is greater than',
  },
  {
    value: 'is-less-than',
    label: 'is less than',
  },
];

export const users: {
  name: string;
  initials: string;
  email: string;
  role: string;
}[] = [
  {
    name: 'Emma Stone',
    initials: 'ES',
    email: 'a.stone@gmail.com',
    role: 'viewer',
  },
  {
    name: 'Alissia McCalister',
    initials: 'AM',
    email: 'a.stone@gmail.com',
    role: 'viewer',
  },
  {
    name: 'Emily Luisa Bernacle',
    initials: 'EB',
    email: 'e.luis.bernacle@gmail.com',
    role: 'member',
  },
  {
    name: 'Aaron Wave',
    initials: 'AW',
    email: 'a.flow@acme.com',
    role: 'contributor',
  },
  {
    name: 'Thomas Palstein',
    initials: 'TP',
    email: 't.palstein@acme.com',
    role: 'viewer',
  },
  {
    name: 'Sarah Johnson',
    initials: 'SJ',
    email: 's.johnson@gmail.com',
    role: 'admin',
  },
  {
    name: 'Megan Katherina Brown',
    initials: 'MB',
    email: 'm.lovelybrown@gmail.com',
    role: 'contributor',
  },
];

export const invitedUsers: {
  initials: string;
  email: string;
  role: string;
  expires: number;
}[] = [
  {
    initials: 'LP',
    email: 'lydia.posh@gmail.com',
    role: 'viewer',
    expires: 12,
  },
  {
    initials: 'AW',
    email: 'awidburg@bluewin.ch',
    role: 'viewer',
    expires: 8,
  },
];

export const usage: Usage[] = [
  {
    user: uuid(),
    status: 'live',
    costs: 5422.35,
    region: 'US-West 1',
    stability: 99,
    createdAt: '2 Months ago',
    lastEdited: '23/09/2023 13:00',
  },
  {
    user: uuid(),
    status: 'live',
    costs: 6087.11,
    region: 'US-East 2',
    stability: 91,
    createdAt: '2 Months ago',
    lastEdited: '22/09/2023 10:45',
  },
  {
    user: uuid(),
    status: 'live',
    costs: 7234.56,
    region: 'EU-West 1',
    stability: 12,
    createdAt: '2 Months ago',
    lastEdited: '17/05/2021 08:32',
  },
  {
    user: uuid(),
    status: 'inactive',
    costs: 0,
    region: 'US-West 2',
    stability: 0,
    createdAt: '2 Months ago',
    lastEdited: '10/11/2022 15:24',
  },
  {
    user: uuid(),
    status: 'live',
    costs: 8190.77,
    region: 'US-East 1',
    stability: 8,
    createdAt: '2 Months ago',
    lastEdited: '05/06/2023 12:16',
  },
  {
    user: uuid(),
    status: 'archived',
    costs: 7609.32,
    region: 'EU-North 1',
    stability: 20,
    createdAt: '2 Months ago',
    lastEdited: '23/01/2022 11:11',
  },
  {
    user: uuid(),
    status: 'live',
    costs: 5204.98,
    region: 'US-West 1',
    stability: 18,
    createdAt: '2 Months ago',
    lastEdited: '14/03/2023 14:45',
  },
  {
    user: uuid(),
    status: 'inactive',
    costs: 0,
    region: 'EU-Central 1',
    stability: 0,
    createdAt: '2 Months ago',
    lastEdited: '12/02/2023 09:12',
  },
  {
    user: uuid(),
    status: 'live',
    costs: 9874.56,
    region: 'US-East 1',
    stability: 6,
    createdAt: '2 Months ago',
    lastEdited: '19/08/2022 16:03',
  },
  {
    user: uuid(),
    status: 'live',
    costs: 5486.99,
    region: 'EU-West 1',
    stability: 12,
    createdAt: '2 Months ago',
    lastEdited: '29/11/2021 17:25',
  },
  {
    user: uuid(),
    status: 'live',
    costs: 6120.45,
    region: 'US-West 2',
    stability: 9,
    createdAt: '2 Months ago',
    lastEdited: '07/12/2023 07:14',
  },
  {
    user: uuid(),
    status: 'live',
    costs: 4834.11,
    region: 'EU-Central 1',
    stability: 15,
    createdAt: '2 Months ago',
    lastEdited: '28/04/2023 10:45',
  },
];
