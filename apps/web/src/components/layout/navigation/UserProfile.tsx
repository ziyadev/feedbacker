'use client';

import { Button, Skeleton } from '@feedbacker/ui';
import { cx, focusRing } from '@/lib/utils';
import { RiMore2Fill } from '@remixicon/react';

import { DropdownUserProfile } from './DropdownUserProfile';
import { useAuth } from '@/features/auth/hooks/useAuth';

export const UserProfile = () => {
  const { user, loading } = useAuth();
  if (loading)
    return (
      <Button
        aria-label="User settings"
        variant="ghost"
        className={cx(
          focusRing,
          'group flex w-full items-center justify-between rounded-md p-2 text-sm font-medium text-gray-900 hover:bg-gray-100 data-[state=open]:bg-gray-50 hover:dark:bg-gray-400/10'
        )}
      >
        <span className="flex items-center gap-3">
          <Skeleton className="size-8 rounded-full" />
          <span className="flex flex-col gap-2">
            <Skeleton className="h-3 w-14 " />
            <Skeleton className="h-2.5 w-36" />
          </span>
        </span>
      </Button>
    );
  return (
    <DropdownUserProfile>
      <Button
        aria-label="User settings"
        variant="ghost"
        className={cx(
          focusRing,
          'group flex w-full items-center justify-between rounded-md p-2 text-sm font-medium text-gray-900 hover:bg-gray-100 data-[state=open]:bg-gray-50 data-[state=open]:dark:bg-gray-400/10 hover:dark:bg-gray-400/10'
        )}
      >
        <span className="flex items-center gap-3">
          <span
            className="flex size-8 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-white text-xs text-gray-700 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-300"
            aria-hidden="true"
          >
            {user?.name.slice(0, 2).toUpperCase()}
          </span>
          <span className="flex flex-col">
            <span className="text-start text-sm font-medium text-gray-900 dark:text-gray-300">
              {user?.name}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {user?.email}
            </span>
          </span>
        </span>
        <RiMore2Fill
          className="size-4 shrink-0 text-gray-500 group-hover:text-gray-700 group-hover:dark:text-gray-400"
          aria-hidden="true"
        />
      </Button>
    </DropdownUserProfile>
  );
};
