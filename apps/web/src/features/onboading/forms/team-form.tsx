import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';
import { WorkspaceMemberRole } from '@/graphql/types';
import { client } from '@/services/admin-client';
import { useForm } from '@tanstack/react-form';
import Link from 'next/link';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { z } from 'zod';
import { useOnboarding } from '../hooks/useOnbording';
const roles = [
  { label: 'Admin', value: WorkspaceMemberRole.Admin },
  { label: 'Editor', value: WorkspaceMemberRole.Editor },
  { label: 'Viewer', value: WorkspaceMemberRole.Viewer },
];
export default function TeamForm() {
  const { nextStep, pending } = useOnboarding();
  const [loading, setLoading] = useState(false);
  // cuz we are looping and calling the same mutate we need to keep track of loading in one state
  const [sendInvite] = client.workspace.member.invitation.useMutation();
  const formSchema = z.object({
    invitations: z.array(
      z.object({
        email: z.string().email(),
        id: z.string(),
        role: z.enum([
          WorkspaceMemberRole.Admin,
          WorkspaceMemberRole.Editor,
          WorkspaceMemberRole.Viewer,
        ]),
      })
    ),
  });
  const form = useForm({
    defaultValues: {
      invitations: [
        {
          email: '',
          role: 'admin',
          id: uuid(),
        },
      ],
    },
    validators: {
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      setLoading(true);
      const invitations = value.invitations.map((item) => ({
        email: item.email,
        role: item.role,
      }));
      // we need to user allSettled to make sure all the mutations are done even errors happen
      await Promise.allSettled(
        invitations.map(
          async (invite) =>
            await sendInvite({
              variables: {
                input: {
                  email: invite.email,
                  role: invite.role as WorkspaceMemberRole,
                },
              },
            })
        )
      ).finally(() => setLoading(false));
      nextStep('finish');
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
      <form.Field name="invitations" mode="array">
        {(field) => (
          <>
            {field.state.value.map((item, index) => (
              <div key={item.id} className="mx-auto space-y-3">
                <Label>Email addresses</Label>
                <div className="grid grid-cols-12 gap-2  p-1">
                  <form.Field key={index} name={`invitations[${index}].email`}>
                    {(subField) => (
                      <Input
                        className="col-span-8 relative"
                        placeholder="Enter an email address"
                        id={subField.name}
                        type="email"
                        name={subField.name}
                        value={subField.state.value}
                        hasError={!!subField.state.meta.errors?.length}
                        onChange={(e) => subField.handleChange(e.target.value)}
                      />
                    )}
                  </form.Field>
                  <form.Field key={index} name={`invitations[${index}].role`}>
                    {(subField) => (
                      <Select
                        name={subField.name}
                        value={subField.state.value}
                        onValueChange={(e) => subField.handleChange(e)}
                      >
                        <SelectTrigger
                          id={subField.name}
                          hasError={!!subField.state.meta.errors?.length}
                          className="col-span-4"
                        >
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {roles.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </form.Field>
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="ghost"
              onClick={() =>
                field.pushValue({
                  email: '',
                  role: '',
                  id: uuid(),
                })
              }
            >
              Add more
            </Button>
          </>
        )}
      </form.Field>

      <div className="mt-6 grid space-y-3">
        <Button type="submit" isLoading={loading || pending}>
          Continue
        </Button>
        <Button variant="secondary" asChild>
          <Link href="/onboarding/finish">Skip</Link>
        </Button>
      </div>
    </form>
  );
}
