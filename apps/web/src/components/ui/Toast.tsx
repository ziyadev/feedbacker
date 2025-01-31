'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-white group-[.toaster]:dark:bg-[#090E1A]  group-[.toaster]:border-gray-200 group-[.toaster]:dark:border-gray-800 group-[.toaster]:shadow-lg',
          description:
            'group-[.toast]:text-gray-900 group-[.toast]:dark:text-gray-50',
          actionButton:
            'group-[.toast]:bg-blue-500 group-[.toast]:dark:bg-blue-500 group-[.toast]:text-white group-[.toast]:dark:text-white',
          cancelButton:
            'group-[.toast]:bg-white group-[.toast]:dark:bg-gray-950 group-[.toast]:text-gray-900 group-[.toast]:dark:text-gray-50',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
