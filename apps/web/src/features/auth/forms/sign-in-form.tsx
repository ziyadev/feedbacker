'use client';
import { useLastLogin } from '@/components/hooks/useLastLogin';
import { BlurIn } from '@/components/motions/blur-in';
import { env } from '@/env.mjs';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { Badge, Button } from '@feedbacker/ui';
import { IconLoader } from '@tabler/icons-react';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import { ReactNode, useEffect, useState, useTransition } from 'react';
export default function SignInForm() {
  const { isAuthenticated, loading } = useAuth();
  const searchParams = useSearchParams();
  if (loading) {
    return <IconLoader className="mx-2 size-5 animate-spin animate-infinite animate-ease-in-out animate-alternate" />;
  }
  if (isAuthenticated) {
    redirect(searchParams.get('next') || '/overview');
  }
  return (
    <div className="flex w-full flex-col items-start sm:max-w-sm">
      <div className="relative flex items-center justify-center rounded-lg bg-white p-3 shadow-lg ring-1 ring-black/5">
        <svg
          fill="none"
          stroke="currentColor"
          viewBox="0 0 48 44"
          className="size-8 text-blue-500 dark:text-blue-500"
          aria-label="Insights logo"
        >
          <path
            strokeWidth={5}
            d="M32.5 33L32.5 11C32.5 6.30558 28.6944 2.5 24 2.5C19.3056 2.5 15.5 6.30558 15.5 11L15.5 33C15.5 37.6944 19.3056 41.5 24 41.5C28.6944 41.5 32.5 37.6944 32.5 33Z"
          />
        </svg>
      </div>
      <div className="mt-6 flex flex-col">
        <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
          Log in to Insights
        </h1>
        <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
          Don’t have an account?{/* */}{' '}
          <a
            className="text-blue-500 hover:text-blue-600 dark:text-blue-500 hover:dark:text-blue-400"
            href="#"
          >
            Sign up
          </a>
        </p>
      </div>
      <div className="mt-10 w-full">
        <div className="gap-2 grid">
          <ProviderButton
            providerName="github"
            label="Continue with Github"
            icon={
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="currentColor"
                aria-hidden="true"
                className="remixicon size-5 mx-2 "
              >
                <path d="M12.001 2C6.47598 2 2.00098 6.475 2.00098 12C2.00098 16.425 4.86348 20.1625 8.83848 21.4875C9.33848 21.575 9.52598 21.275 9.52598 21.0125C9.52598 20.775 9.51348 19.9875 9.51348 19.15C7.00098 19.6125 6.35098 18.5375 6.15098 17.975C6.03848 17.6875 5.55098 16.8 5.12598 16.5625C4.77598 16.375 4.27598 15.9125 5.11348 15.9C5.90098 15.8875 6.46348 16.625 6.65098 16.925C7.55098 18.4375 8.98848 18.0125 9.56348 17.75C9.65098 17.1 9.91348 16.6625 10.201 16.4125C7.97598 16.1625 5.65098 15.3 5.65098 11.475C5.65098 10.3875 6.03848 9.4875 6.67598 8.7875C6.57598 8.5375 6.22598 7.5125 6.77598 6.1375C6.77598 6.1375 7.61348 5.875 9.52598 7.1625C10.326 6.9375 11.176 6.825 12.026 6.825C12.876 6.825 13.726 6.9375 14.526 7.1625C16.4385 5.8625 17.276 6.1375 17.276 6.1375C17.826 7.5125 17.476 8.5375 17.376 8.7875C18.0135 9.4875 18.401 10.375 18.401 11.475C18.401 15.3125 16.0635 16.1625 13.8385 16.4125C14.201 16.725 14.5135 17.325 14.5135 18.2625C14.5135 19.6 14.501 20.675 14.501 21.0125C14.501 21.275 14.6885 21.5875 15.1885 21.4875C19.259 20.1133 21.9999 16.2963 22.001 12C22.001 6.475 17.526 2 12.001 2Z" />
              </svg>
            }
          />
          <ProviderButton
            providerName="google"
            label="Continue with Google"
            icon={
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="currentColor"
                aria-hidden="true"
                className="remixicon size-5 mx-2 "
              >
                <path d="M3.06364 7.50914C4.70909 4.24092 8.09084 2 12 2C14.6954 2 16.959 2.99095 18.6909 4.60455L15.8227 7.47274C14.7864 6.48185 13.4681 5.97727 12 5.97727C9.39542 5.97727 7.19084 7.73637 6.40455 10.1C6.2045 10.7 6.09086 11.3409 6.09086 12C6.09086 12.6591 6.2045 13.3 6.40455 13.9C7.19084 16.2636 9.39542 18.0227 12 18.0227C13.3454 18.0227 14.4909 17.6682 15.3864 17.0682C16.4454 16.3591 17.15 15.3 17.3818 14.05H12V10.1818H21.4181C21.5364 10.8363 21.6 11.5182 21.6 12.2273C21.6 15.2727 20.5091 17.8363 18.6181 19.5773C16.9636 21.1046 14.7 22 12 22C8.09084 22 4.70909 19.7591 3.06364 16.4909C2.38638 15.1409 2 13.6136 2 12C2 10.3864 2.38638 8.85911 3.06364 7.50914Z" />
              </svg>
            }
          />
        </div>
        <div
          className="mx-auto flex w-full items-center justify-between gap-3 text-sm text-gray-500 dark:text-gray-500 my-4"
          tremor-id="tremor-raw"
        >
          <div className="h-[1px] w-full bg-gray-200 dark:bg-gray-800" />
          <div className="whitespace-nowrap text-inherit">or</div>
          <div className="h-[1px] w-full bg-gray-200 dark:bg-gray-800" />
        </div>
        <EmailSection />
      </div>
      <div
        className="mx-auto my-6 flex w-full items-center justify-between gap-3 text-sm text-gray-500 dark:text-gray-500"
        tremor-id="tremor-raw"
      >
        <div className="h-[1px] w-full bg-gray-200 dark:bg-gray-800" />
      </div>
      <p className="text-sm text-gray-700 dark:text-gray-300">
        Forgot your password?{/* */}{' '}
        <a
          className="text-blue-500 hover:text-blue-600 dark:text-blue-500 hover:dark:text-blue-400"
          href="#"
        >
          Reset password
        </a>
      </p>
    </div>
  );
}
export const ProviderButton = ({
  providerName,
  icon,
  label,
}: {
  providerName: 'google' | 'github';
  icon: ReactNode;
  label: string;
}) => {
  const { value, setValue } = useLastLogin();
  const searchParams = useSearchParams();
  const status = searchParams.get('status');
  const redirectedProvider = searchParams.get('provider');
  const next = searchParams.get('next');
  const [pending, startTransition] = useTransition();
  const { replace } = useRouter();
  const onClick = () => {
    startTransition(() => {
      const url = new URL(`${env.NEXT_PUBLIC_API_URL}/auth/${providerName}`);
      // we pass redirectUri to the api if the next exists so we redirect user directly to the next after sign-in
      if (next) url.searchParams.set('next', next);
      url.searchParams.set(
        'redirectUrl',
        encodeURI('http://app.localhost.com' + '/overview')
      );
      replace(url.toString()); // redirect to the
    });
  };
  const isLoading = pending || redirectedProvider === providerName;
  useEffect(() => {
    if (status === 'success' && redirectedProvider === providerName) {
      setValue(providerName);
      replace('/overview');
    }
  }, [status, redirectedProvider, setValue, next, replace, providerName]);
  return (
    <Button
      disabled={isLoading}
      variant="secondary"
      className="relative "
      onClick={onClick}
    >
      {value === providerName && (
        <Badge className="absolute top-1.2 right-1  " size="xs">
          Racently used
        </Badge>
      )}
      {isLoading ? (
        <IconLoader className="mx-2 size-5 animate-spin animate-infinite animate-ease-in-out animate-alternate" />
      ) : (
        icon
      )}
      {label}
    </Button>
  );
};

export const EmailSection = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="flex w-full flex-col gap-y-6">
      {show && (
        <BlurIn>
          <div className="flex flex-col gap-y-4 ">
            <div className="flex flex-col space-y-2">
              <label
                className="text-sm leading-none text-gray-900 dark:text-gray-50 font-medium"
                tremor-id="tremor-raw"
                htmlFor="email-form-item"
              >
                Email
              </label>
              <div className="relative w-full" tremor-id="tremor-raw">
                <input
                  type="email"
                  className="relative block w-full appearance-none rounded-md border px-2.5 py-2 shadow-sm outline-none transition sm:text-sm border-gray-300 dark:border-gray-800 text-gray-900 dark:text-gray-50 placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-[#090E1A] disabled:border-gray-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:dark:border-gray-700 disabled:dark:bg-gray-800 disabled:dark:text-gray-500 file:-my-2 file:-ml-2.5 file:cursor-pointer file:rounded-l-[5px] file:rounded-r-none file:border-0 file:px-3 file:py-2 file:outline-none focus:outline-none disabled:pointer-events-none file:disabled:pointer-events-none file:border-solid file:border-gray-300 file:bg-gray-50 file:text-gray-500 file:hover:bg-gray-100 file:dark:border-gray-800 file:dark:bg-gray-950 file:hover:dark:bg-gray-900/20 file:disabled:dark:border-gray-700 file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] file:disabled:bg-gray-100 file:disabled:text-gray-500 file:disabled:dark:bg-gray-800 focus:ring-2 focus:ring-blue-200 focus:dark:ring-blue-700/30 focus:border-blue-500 focus:dark:border-blue-700 [&::--webkit-search-cancel-button]:hidden [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
                  autoComplete="email"
                  id="email-form-item"
                  placeholder="emily.ross@acme.ch"
                  name="email"
                />
              </div>
            </div>
          </div>
        </BlurIn>
      )}
      <Button onClick={() => setShow(true)}>Continue with Email</Button>
    </div>
  );
};
