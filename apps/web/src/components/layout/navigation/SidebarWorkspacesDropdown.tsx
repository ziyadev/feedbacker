'use client';

import { useWorkspace } from '@/features/workspace/hooks/useWorkspace';
import { cx, focusInput } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Skeleton,
} from '@feedbacker/ui';
import { RiExpandUpDownLine } from '@remixicon/react';
import React from 'react';
import { ModalAddWorkspace } from './ModalAddWorkspace';

const workspaces = [
  {
    value: 'retail-analytics',
    name: 'Retail analytics',
    initials: 'RA',
    role: 'Member',
    color: 'bg-indigo-600 dark:bg-indigo-500',
  },
  // Add more workspaces...
];

export const WorkspacesDropdownDesktop = () => {
  const { workspace, loading } = useWorkspace();
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [hasOpenDialog, setHasOpenDialog] = React.useState(false);
  const dropdownTriggerRef = React.useRef<null | HTMLButtonElement>(null);
  const focusRef = React.useRef<null | HTMLButtonElement>(null);

  const handleDialogItemSelect = () => {
    focusRef.current = dropdownTriggerRef.current;
  };

  const handleDialogItemOpenChange = (open: boolean) => {
    setHasOpenDialog(open);
    if (open === false) {
      setDropdownOpen(false);
    }
  };
  if (loading) {
    return (
      <button
        disabled
        className={cx(
          'flex w-full items-center gap-x-2.5 rounded-md border border-gray-300 bg-white p-2 text-sm shadow-sm transition-all dark:border-gray-800 dark:bg-gray-950 ',
          focusInput
        )}
      >
        <Skeleton className="size-8 aspect-square rounded-md" />
        <div className="flex w-full items-center justify-between gap-x-4 truncate">
          <div className="truncate space-y-2">
            <Skeleton className="h-3.5 rounded-md  w-32" />
            <Skeleton className="h-3 rounded-md w-12" />
          </div>
        </div>
      </button>
    );
  }
  return (
    <>
      {/* sidebar (lg+) */}
      <DropdownMenu
        open={dropdownOpen}
        onOpenChange={setDropdownOpen}
        modal={false}
      >
        <DropdownMenuTrigger asChild>
          <button
            className={cx(
              'flex w-full items-center gap-x-2.5 rounded-md border border-gray-300 bg-white p-2 text-sm shadow-sm transition-all hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-950 hover:dark:bg-gray-900',
              focusInput
            )}
          >
            <span
              className="flex aspect-square size-8 items-center justify-center rounded bg-blue-500 dark:bg-blue-500 p-2 text-xs font-medium text-white "
              aria-hidden="true"
            >
              {workspace?.name.slice(0, 1).toUpperCase()}
            </span>
            <div className="flex w-full items-center justify-between gap-x-4 truncate">
              <div className="truncate">
                <p className="truncate whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-50">
                  {workspace?.name}
                </p>
                <p className="whitespace-nowrap text-left text-xs text-gray-700 dark:text-gray-300">
                  {`${workspace?.role.charAt(0).toUpperCase()}${workspace?.role
                    .slice(1)
                    .toLowerCase()}`}
                </p>
              </div>
              <RiExpandUpDownLine
                className="size-5 shrink-0 text-gray-500"
                aria-hidden="true"
              />
            </div>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          hidden={hasOpenDialog}
          onCloseAutoFocus={(event) => {
            if (focusRef.current) {
              focusRef.current.focus();
              focusRef.current = null;
              event.preventDefault();
            }
          }}
        >
          <DropdownMenuGroup>
            <DropdownMenuLabel>
              Workspaces ({workspaces.length})
            </DropdownMenuLabel>
            {workspaces.map((workspace) => (
              <DropdownMenuItem key={workspace.value}>
                <div className="flex w-full items-center gap-x-2.5">
                  <span
                    className={cx(
                      workspace.color,
                      'flex aspect-square size-8 items-center justify-center rounded p-2 text-xs font-medium text-white'
                    )}
                    aria-hidden="true"
                  >
                    {workspace.initials}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
                      {workspace.name}
                    </p>
                    <p className="text-xs text-gray-700 dark:text-gray-400">
                      {workspace.role}
                    </p>
                  </div>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <ModalAddWorkspace
            onSelect={handleDialogItemSelect}
            onOpenChange={handleDialogItemOpenChange}
            itemName="Add workspace"
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export const WorkspacesDropdownMobile = () => {
  const { workspace, loading } = useWorkspace();

  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [hasOpenDialog, setHasOpenDialog] = React.useState(false);
  const dropdownTriggerRef = React.useRef<null | HTMLButtonElement>(null);
  const focusRef = React.useRef<null | HTMLButtonElement>(null);

  const handleDialogItemSelect = () => {
    focusRef.current = dropdownTriggerRef.current;
  };

  const handleDialogItemOpenChange = (open: boolean) => {
    setHasOpenDialog(open);
    if (open === false) {
      setDropdownOpen(false);
    }
  };
  if (loading) {
    return (
      <button className="flex items-center gap-x-1.5 rounded-md p-2 hover:bg-gray-100 focus:outline-none hover:dark:bg-gray-900">
        <Skeleton className="size-8 aspect-square rounded-md" />
      </button>
    );
  }
  return (
    <>
      {/* sidebar (xs-lg) */}
      <DropdownMenu
        open={dropdownOpen}
        onOpenChange={setDropdownOpen}
        modal={false}
      >
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-x-1.5 rounded-md p-2 hover:bg-gray-100 focus:outline-none hover:dark:bg-gray-900">
            <span
              className={cx(
                'flex aspect-square size-7 items-center justify-center rounded bg-indigo-600 p-2 text-xs font-medium text-white dark:bg-indigo-500'
              )}
              aria-hidden="true"
            >
              {workspace?.name.slice(0, 1).toUpperCase()}
            </span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="!min-w-72"
          hidden={hasOpenDialog}
          onCloseAutoFocus={(event) => {
            if (focusRef.current) {
              focusRef.current.focus();
              focusRef.current = null;
              event.preventDefault();
            }
          }}
        >
          <DropdownMenuGroup>
            <DropdownMenuLabel>
              Workspaces ({workspaces.length})
            </DropdownMenuLabel>
            {workspaces.map((workspace) => (
              <DropdownMenuItem key={workspace.value}>
                <div className="flex w-full items-center gap-x-2.5">
                  <span
                    className={cx(
                      workspace.color,
                      'flex size-8 items-center justify-center rounded p-2 text-xs font-medium text-white'
                    )}
                    aria-hidden="true"
                  >
                    {workspace.initials}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
                      {workspace.name}
                    </p>
                    <p className="text-xs text-gray-700 dark:text-gray-300">
                      {workspace.role}
                    </p>
                  </div>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <ModalAddWorkspace
            onSelect={handleDialogItemSelect}
            onOpenChange={handleDialogItemOpenChange}
            itemName="Add workspace"
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
