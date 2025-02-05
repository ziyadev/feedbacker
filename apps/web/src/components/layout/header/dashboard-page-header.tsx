import { PropsWithChildren } from 'react';

export default function DashboardPageHeader({
  title,
  description,
  children,
}: PropsWithChildren<{
  title: string;
  description: string;
}>) {
  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className=" text-lg   font-semibold text-gray-900 dark:text-gray-50">
            {title}
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm/6 dark:text-gray-500">
            {description}
          </p>
        </div>
        {children}
      </div>
      <div className="mx-auto my-6 flex w-full items-center justify-between gap-3 text-sm text-gray-500 dark:text-gray-500">
        <div className="h-[1px] w-full bg-gray-200 dark:bg-gray-800"></div>
      </div>
    </div>
  );
}
