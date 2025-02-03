import { cx } from '@/components/lib/utils';
import { Button, Input, InputMessage, Label } from '@/components/ui';
import { CreateWorkspaceErrorCode } from '@/graphql/types';
import { client } from '@/services/admin-client';
import {
  RiCheckboxCircleFill,
  RiCloseCircleFill,
  RiLoader5Line,
  RiUploadCloud2Line,
} from '@remixicon/react';
import { useForm } from '@tanstack/react-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useOnboarding } from '../hooks/useOnbording';

export default function CreateWorkspaceForm() {
  const errorMessages = {
    [CreateWorkspaceErrorCode.SlugAlreadyTaken]:
      'Slug is not available, please create another one',
  };
  const { nextStep, pending } = useOnboarding();
  const [create, { loading: createWorkspaceLoading }] =
    client.workspace.create.useMutation({
      onCompleted: ({ createWorkspace: { errors } }) => {
        if (errors) {
          for (const error of errors) {
            if (error.code === CreateWorkspaceErrorCode.SlugAlreadyTaken) {
              toast.error('Invalid slug', {
                description:
                  errorMessages[CreateWorkspaceErrorCode.SlugAlreadyTaken],
                duration: 3000,
              });
            }
          }
        }
        nextStep('company');
      },
    });
  const [
    isSlugUnique,
    { data: isSlugUniqueData, loading: isSlugUniqueLoading },
  ] = client.workspace.isSlugUnique.useMutation();

  const form = useForm({
    defaultValues: {
      name: '',
      slug: '',
    },
    onSubmit: async ({ value }) => {
      await create({
        variables: {
          input: {
            name: value.name,
            slug: value.slug,
          },
        },
      });
    },
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        void form.handleSubmit();
      }}
      className="mt-4 space-y-3"
    >
      <div className="mx-auto gap-6 flex items-start flex-col sm:flex-row">
        <div className="size-20 rounded-md bg-sky-600"></div>
        <div className="  -mt-1.5">
          <Label htmlFor="logo">Workspace logo</Label>
          <div className="flex space-x-3">
            <Button variant="secondary">
              <RiUploadCloud2Line className="mr-2" />
              Upload image
            </Button>
            <Button variant="secondary" disabled>
              Remove
            </Button>
          </div>
          <p className="mt-1 text-gray-700 text-xs sm:text-sm dark:text-gray-300">
            *.png, *.jpeg files up to 10MB at least 400px by 400px
          </p>
        </div>
      </div>
      <form.Field
        name="name"
        validators={{
          onChange: ({ value }) => {
            const parsedResult = z.string().min(3).max(50).safeParse(value);
            if (!parsedResult.success) {
              return parsedResult.error.errors.map((e) => e.message).join(', ');
            }
          },
        }}
      >
        {(field) => (
          <div className="flex flex-col space-y-2">
            <Label htmlFor={field.name}>Workspace name</Label>
            <Input
              placeholder="Enter a workspace name"
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

      <form.Field
        name="slug"
        validators={{
          onChangeAsync: async ({ value }) => {
            try {
              const parsedResult = z
                .string()
                .min(3, 'Slug must be at least 3 characters')
                .max(30, 'Slug must be less than 30 characters')
                .refine(
                  (val) =>
                    val.replace(/[^a-zA-Z0-9]/g, '').toLowerCase() ===
                    val.toLowerCase(),
                  'Slug can only contain letters and numbers'
                )
                .safeParse(value);
              if (!parsedResult.success) {
                return parsedResult.error.errors
                  .map((e) => e.message)
                  .join(', ');
              }
              const { data } = await isSlugUnique({
                variables: {
                  input: {
                    slug: value,
                  },
                },
              });
              if (!data?.isWorkspaceSlugValid) {
                return 'This slug is already taken';
              }
            } catch (e) {
              console.error(e);
              toast.error('Something went wrong');
            }
          },
        }}
        asyncDebounceMs={500}
      >
        {(field) => (
          <div className="flex flex-col space-y-2">
            <Label htmlFor={field.name}>Workspace slug</Label>
            <div className="relative w-full">
              <Input
                placeholder="api.feedbacker.io/myworkspace"
                id={field.name}
                name={field.name}
                value={field.state.value}
                hasError={!!field.state.meta.errors?.length}
                onChange={(e) => field.handleChange(e.target.value)}
              />

              <div
                className={cx(
                  'absolute bottom-0 right-0 flex h-full items-center justify-center px-3',
                  !field.state.meta.isTouched && 'hidden'
                )}
              >
                {isSlugUniqueLoading ? (
                  <RiLoader5Line className="animate-spin" />
                ) : isSlugUniqueData?.isWorkspaceSlugValid ? (
                  <RiCheckboxCircleFill className="text-emerald-50 dark:text-emerald-400 size-5" />
                ) : (
                  <RiCloseCircleFill className="text-red-50 dark:text-red-400 size-5" />
                )}
              </div>
            </div>
            <InputMessage>
              {field.state.meta.errors
                ? field.state.meta.errors.join(', ')
                : null}
            </InputMessage>
          </div>
        )}
      </form.Field>

      <div className="mt-6 grid">
        <Button
          className="disabled:bg-gray-200 disabled:text-gray-500"
          type="submit"
          isLoading={createWorkspaceLoading || pending}
        >
          Continue
        </Button>
      </div>
    </form>
  );
}
