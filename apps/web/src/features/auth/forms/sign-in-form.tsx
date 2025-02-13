'use client';
import { useLastLogin } from '@/components/hooks/useLastLogin';
import { CredentialsLoginErrorCode } from '@/graphql/types';
import { useMutation } from '@apollo/client';
import { Button, Input, InputMessage, Label } from '@feedbacker/ui';
import { useForm } from '@tanstack/react-form';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { z } from 'zod';
import { CREDENTIALS_LOGIN } from '../api/mutations';
import { ProviderButton } from '../ui/provider-button';
export default function SignInForm() {
  return (
    <>
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
        <div className="mx-auto flex w-full items-center justify-between gap-3 text-sm text-gray-500 dark:text-gray-500 my-4">
          <div className="h-[1px] w-full bg-gray-200 dark:bg-gray-800" />
          <div className="whitespace-nowrap text-inherit">or</div>
          <div className="h-[1px] w-full bg-gray-200 dark:bg-gray-800" />
        </div>
        <EmailSection />
      </div>
      <SignInFormFooter />
    </>
  );
}

export const EmailSection = () => {
  const router = useRouter();
  const { setValue } = useLastLogin();
  const errorMessages: { [key: string]: string } = {
    [CredentialsLoginErrorCode.InvalidCredentials]:
      'Your email or password is incorrect',
  };
  const searchParams = useSearchParams();
  const next = searchParams.get('next');
  const formSchema = z.object({
    email: z.string().email({
      message: 'Invalid email address, please type a valid email address',
    }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .refine((value) => /[@#$%^&*()_+!]/.test(value), {
        message: 'Password must include at least one special character.',
      })
      .refine((value) => /[A-Z]/.test(value), {
        message: 'Password must include at least one uppercase letter.',
      })
      .refine((value) => /\d/.test(value), {
        message: 'Password must include at least one number.',
      }),
  });
  const form = useForm({
    defaultValues: {
      email: searchParams.get('email') || '',
      password: '',
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      await login({
        variables: {
          input: value,
        },
      });
    },
  });
  const [login, { loading }] = useMutation(CREDENTIALS_LOGIN, {
    onCompleted: ({ credentialsLogin: { user, errors } }) => {
      if (!errors) {
        // check if there are no errors
        setValue('credentials');
        router.push(next || '/dashboard');
        return;
      }
      for (const error of errors) {
        // if the error code is invalid credentials, set the error message
        if (error.code === CredentialsLoginErrorCode.InvalidCredentials) {
          form.setFieldMeta('password', (prev) => ({
            ...prev,
            errorMap: {
              onSubmit: errorMessages[error.code],
            },
          }));
        }
      }
    },
  });

  return (
    <div className="flex w-full flex-col gap-y-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          void form.handleSubmit();
        }}
        className="flex flex-col gap-y-4 "
      >
        <form.Field name="email">
          {(field) => (
            <div className="flex flex-col space-y-2">
              <Label htmlFor={field.name}>Email</Label>
              <Input
                placeholder="Enter email"
                id={field.name}
                name={field.name}
                value={field.state.value}
                hasError={!!field.state.meta.errors?.length}
                type="email"
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <InputMessage>
                {field.state.meta.errors
                  ? field.state.meta.errors.join(', ')
                  : null}
              </InputMessage>
            </div>
          )}
        </form.Field>
        <form.Field name="password">
          {(field) => (
            <div className="flex flex-col space-y-2">
              <Label htmlFor={field.name}>Password</Label>
              <Input
                placeholder="Enter password"
                type="password"
                id={field.name}
                name={field.name}
                value={field.state.value}
                hasError={!!field.state.meta.errors?.length}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <InputMessage>
                {field.state.meta.errors
                  ? field.state.meta.errors.join(', ')
                  : null}
              </InputMessage>
            </div>
          )}
        </form.Field>
        <Button type="submit" isLoading={loading}>
          Sign in
        </Button>
      </form>
    </div>
  );
};

const SignInFormFooter = () => {
  return (
    <>
      <div className="mx-auto my-6 flex w-full items-center justify-between gap-3 text-sm text-gray-500 dark:text-gray-500">
        <div className="h-[1px] w-full bg-gray-200 dark:bg-gray-800" />
      </div>
      <p className="text-sm text-gray-700 dark:text-gray-300">
        Forgot your password?{/* */}{' '}
        <Link
          className="text-blue-500 hover:text-blue-600 dark:text-blue-500 hover:dark:text-blue-400"
          href="/auth/reset-password"
        >
          Reset password
        </Link>
      </p>
    </>
  );
};
