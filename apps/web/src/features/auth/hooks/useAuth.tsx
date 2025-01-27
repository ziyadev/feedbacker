import { GET_USER } from '@/features/auth/api/queries';
import { useQuery } from '@apollo/client';

export const useAuth = () => {
  const { data, ...rest } = useQuery(GET_USER);

  return {
    ...rest,
    data: {
      ...data,
      isAuthenticated: !!data?.user,
    },
  };
};
