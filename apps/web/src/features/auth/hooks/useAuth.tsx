import { useLogout } from './useLogout';
import { create } from 'zustand';
import { UserModel } from '@/graphql/graphql';
import { useEffect, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_PROFILE } from '@/features/user/api/queries';

interface UserState {
  user: UserModel | null;
  setUser: (user: UserModel | null) => void;
}

// Zustand store for user state
const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export const useAuth = () => {
  const { data, ...rest } = useQuery(GET_USER_PROFILE);
  const user = data?.user ?? null;
  const { setUser } = useUserStore();
  const logout = useLogout({ onSuccess: () => setUser(null) });

  // Sync Zustand store with GraphQL user data
  useEffect(() => {
    setUser(user);
  }, [user, setUser]);

  return useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      setUser,
      logout,
      ...rest,
    }),
    [user, logout, rest, setUser]
  );
};
