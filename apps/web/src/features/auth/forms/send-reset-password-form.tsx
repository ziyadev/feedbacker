'use client';
import { BlurIn } from '@/components/motions/blur-in';
import { LoadingIcon } from '@/components/ui/icons/loading-icon';
import { SendResetPasswordEmailErrorCode } from '@/graphql/types';
import { useMutation } from '@apollo/client';
import { Button, Input, InputMessage, Label } from '@feedbacker/ui';
import { useForm } from '@tanstack/react-form';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';
import { SEND_RESET_PASSWORD_LINK } from '../api/mutations';
export default function SendResetPasswordEmailForm() {
  return (
    <>
      <div className="mt-10 w-full">
        <EmailSection />
      </div>
      <SendResetPasswordEmailFooter />
    </>
  );
}

export const EmailSection = () => {
  const [isSent, setIsSent] = useState(false);
  const errorMessages: { [key: string]: string } = {
    [SendResetPasswordEmailErrorCode.EmailNotFound]:
      'This email address is not registered',
  };
  const formSchema = z.object({
    email: z.string().email({
      message: 'Invalid email address, please type a valid email address',
    }),
  });
  const form = useForm({
    defaultValues: {
      email: '',
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      await sendResetEmail({
        variables: {
          input: value,
        },
      });
    },
  });
  const [sendResetEmail, { loading }] = useMutation(SEND_RESET_PASSWORD_LINK, {
    onCompleted: ({ sendResetPasswordLink: { errors } }) => {
      if (!errors) {
        toast.success('Email sent!', {
          description: 'Check your email for the reset instructions',
        });
        setIsSent(true);
        return;
      }
      for (const error of errors) {
        // if the error code is invalid credentials, set the error message
        if (error.code === SendResetPasswordEmailErrorCode.EmailNotFound) {
          form.setFieldMeta('email', (prev) => ({
            ...prev,
            errorMap: {
              onSubmit: errorMessages[error.code],
            },
          }));
        }
        if (
          error.code ===
          SendResetPasswordEmailErrorCode.MaxResetAttemptsExceeded
        ) {
          toast.error(
            'You have exceeded the maximum number of reset attempts. Please try again later.'
          );
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

        {isSent ? (
          <Button type="button" asChild>
            <Link href={'mailto:'}>Check your email</Link>
          </Button>
        ) : (
          <Button type="submit" disabled={loading}>
            {loading ? <LoadingIcon /> : 'Send reset instructions'}
          </Button>
        )}
        {isSent && (
          <BlurIn className="w-full grid">
            <Button asChild variant="secondary" type="button">
              <Link href={'/auth/sign-in'}>Back to login</Link>
            </Button>
          </BlurIn>
        )}
      </form>
    </div>
  );
};

const SendResetPasswordEmailFooter = () => {
  return (
    <>
      {' '}
      <div
        className="mx-auto my-6 flex w-full items-center justify-between gap-3 text-sm text-gray-500 dark:text-gray-500"
        tremor-id="tremor-raw"
      >
        <div className="h-[1px] w-full bg-gray-200 dark:bg-gray-800" />
      </div>
      <p className="text-sm text-gray-700 dark:text-gray-300">
        If you have problems with your account, please contact us at{' '}
        <Link
          className="text-blue-500 hover:text-blue-600 dark:text-blue-500 hover:dark:text-blue-400"
          href="mailto:support@feedbacker.com"
        >
          our support email
        </Link>
      </p>
    </>
  );
};
