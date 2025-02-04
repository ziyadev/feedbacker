import { WorkspaceMemberRole } from '@/graphql/types';
import { cookies } from 'next/headers';

export const auth = async () => {
  return await getSession();
};
export const getSession = async (): Promise<null | {
  workspace: {
    id: string;
    role: WorkspaceMemberRole;
  };
  user: { id: string; email: string; emailVerified: boolean; planId: string };
}> => {
  const cookiesStore = await cookies();

  return await fetch('http://localhost:3852/auth/session', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookiesStore.toString(),
    },
  })
    .then(async (res) => {
      if (res.status === 401 || res.status === 403) {
        return null; // Unauthorized
      }
      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
      }
      const response = await res.json();
      return response.session;
    })
    .catch((error) => {
      console.error('Error fetching session:', error);
      return null;
    });
};
