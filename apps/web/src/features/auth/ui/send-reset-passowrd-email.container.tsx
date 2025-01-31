import { BlurIn } from '@/components/motions/blur-in';
import { LogoLink } from '@/components/ui/logo-link';
import { PropsWithChildren } from 'react';
export const SendResetPasswordEmailContainer = ({
  children,
}: PropsWithChildren) => {
  return (
    <BlurIn className="flex w-full flex-col items-start sm:max-w-sm">
      <LogoLink />
      <div className="mt-6 flex flex-col">
        <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
          Reset your password
        </h1>
        <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
          Include the email address associated with your account and we’ll send
          you an email with instructions to reset your password.
        </p>
      </div>
      {children}
    </BlurIn>
  );
};
