import { useUser } from '@/features/user/hooks/useUser';
import { useLogout } from './useLogout';

export const useAuth = () => {
  const { user, ...rest } = useUser();

  const logout = useLogout();

  return {
    user,
    isAuthenticated: !!user,
    logout,
    ...rest,
  };
};
