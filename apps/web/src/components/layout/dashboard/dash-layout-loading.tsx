'use client';

import { RiLoader5Line } from '@remixicon/react';

export const DashLayoutLoading = () => {
  return (
    <div className="mx-auto max-w-screen-2xl">
      <>
        {/* sidebar (lg+) */}
        <nav className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          <aside className="flex grow flex-col gap-y-6 overflow-y-auto border-r border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950"></aside>
        </nav>
        {/* top navbar (xs-lg) */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-2 shadow-sm sm:gap-x-6 sm:px-4 lg:hidden dark:border-gray-800 dark:bg-gray-950">
          loading
        </div>
      </>
      <main className="lg:pl-72 flex justify-center items-center h-screen">
        <RiLoader5Line className="size-10 animate-spin" aria-hidden="true" />
      </main>
    </div>
  );
};
