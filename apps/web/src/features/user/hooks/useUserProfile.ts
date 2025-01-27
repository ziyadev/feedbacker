'use client';
import { useQuery } from '@apollo/client';
import { GET_USER_PROFILE } from '@/features/user/api/queries';
export const useUserProfile = () => {
  const query = useQuery(GET_USER_PROFILE);

  return {
    ...query,
  };
};
