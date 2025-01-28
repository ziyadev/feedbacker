'use client';
import { useQuery } from '@apollo/client';
import { GET_USER_PROFILE } from '@/features/user/api/queries';
export const useUser = () => {
  const { data, ...rest } = useQuery(GET_USER_PROFILE);
  return { user: data?.user, ...rest };
};
