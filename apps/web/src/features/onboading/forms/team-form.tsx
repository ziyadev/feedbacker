import {
    Button,
    Input,
    Label,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui';
import { useForm } from '@tanstack/react-form';
import Link from 'next/link';
import { v4 as uuid } from 'uuid';
import { z } from 'zod';
const roles = [
  { label: 'Admin', value: 'admin' },
  { label: 'Editor', value: 'editor' },
  { label: 'Viewer', value: 'viewer' },
];
export default function TeamForm() {
  const formSchema = z.object({
    invitations: z.array(
      z.object({
        email: z.string().email(),
        id: z.string(),
        role: z.enum(['admin', 'editor', 'viewer']),
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
    onSubmit: async ({ value }) => {},
  });
  return (
    <form onSubmit={() => true} className="mt-4 space-y-3">
      <form.Field name="invitations" mode="array">
        {(field) =>
          field.state.value.map((item, index) => (
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
          ))
        }
      </form.Field>

      <div className="mt-6 grid space-y-3">
        <Button
          className="disabled:bg-gray-200 disabled:text-gray-500"
          type="submit"
          isLoading={false}
        >
          {false ? 'Submitting...' : 'Continue'}
        </Button>
        <Button variant="secondary" asChild>
          <Link href="/onboarding/company">Back</Link>
        </Button>
      </div>
    </form>
  );
}
