import { BlurIn } from '@/components/motions/blur-in';
import { LogoLink } from '@/components/ui/logo-link';
import { APP_NAME } from '@repo/utils';
import Link from 'next/link';
import { PropsWithChildren } from 'react';
export const SignInContainer = ({ children }: PropsWithChildren) => {
  return (
    <BlurIn className="flex w-full flex-col items-start sm:max-w-sm">
      <LogoLink />
      <div className="mt-6 flex flex-col">
        <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
          Log in to {APP_NAME}
        </h1>
        <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
          Don’t have an account?{/* */}{' '}
          <Link
            className="text-blue-500 hover:text-blue-600 dark:text-blue-500 hover:dark:text-blue-400"
            href="/auth/sign-up"
          >
            Sign up
          </Link>
        </p>
      </div>
      {children}
    </BlurIn>
  );
};
