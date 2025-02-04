import getUnicodeFlagIcon from 'country-flag-icons/unicode';

import {
    Button,
    InputMessage,
    Label,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui';
import { CreateUserProfileErrorCode } from '@/graphql/types';
import { useMutation } from '@apollo/client';
import { useForm } from '@tanstack/react-form';
import Link from 'next/link';
import countryList from 'react-select-country-list';
import { toast } from 'sonner';
import { z } from 'zod';
import { CREATE_USER_PROFILE_MUTATION } from '../api/mutations';
import { useOnboarding } from '../hooks/useOnbording';

const companyTypes = [
  {
    label: ' Tech Statup',
    value: 'tech-startup',
  },
  {
    label: 'Design Agency',
    value: 'design-agency',
  },
  {
    label: 'SaaS',
    value: 'saas',
  },
  {
    label: 'Marketing',
    value: 'marketing',
  },
  {
    label: 'eCommerce business',
    value: 'ecommerce',
  },
  {
    label: 'Software development',
    value: 'software-development',
  },
  {
    label: 'Tech Enterprise',
    value: 'tech-enterprise',
  },
  {
    label: 'Small Consulting & Advisory firm',
    value: 'small-consulting',
  },
  {
    label: 'Other',
    value: 'other',
  },
];
const companyTeamSizes = [
  {
    label: '1 to 3',
    value: '1-3',
  },
  {
    label: '10 to 20',
    value: '10-20',
  },
  {
    label: '20 to 50',
    value: '20-50',
  },

  {
    label: 'More than 50',
    value: '+50',
  },
];
const userRoles = [
  {
    label: 'Founder',
    value: 'founder',
  },
  {
    label: 'Manager',
    value: 'manager',
  },
  {
    label: 'Marketing lead',
    value: 'marketing-lead',
  },
  {
    label: 'Engineer',
    value: 'engineer',
  },
  {
    label: 'Product Manager',
    value: 'product-manager',
  },
  {
    label: 'Designer',
    value: 'designer',
  },
  {
    label: 'Sales Representative',
    value: 'sales-rep',
  },
  {
    label: 'Customer Support',
    value: 'customer-support',
  },
  {
    label: 'Other',
    value: 'other',
  },
];
export default function CompanyDetailsForm() {
  const countries = countryList().getData();
  const { nextStep, pending } = useOnboarding();
  const errorMessages = {
    [CreateUserProfileErrorCode.AlreadyExists]: 'Your already submited',
  };
  const [create, { loading }] = useMutation(CREATE_USER_PROFILE_MUTATION, {
    onCompleted: ({ createUserProfile: { errors } }) => {
      if (!errors) {
        nextStep('team');
      } else {
        for (const error of errors) {
          if (error.code === CreateUserProfileErrorCode.AlreadyExists) {
            toast.error('Error creating profile', {
              description:
                errorMessages[CreateUserProfileErrorCode.AlreadyExists],
              duration: 4000,
            });
          }
        }
      }
    },
  });

  const formSchema = z.object({
    kind: z.array(z.string()),
    role: z.string(),
    country: z.string(),
    teamSize: z.string(),
  });
  const form = useForm({
    defaultValues: {
      kind: [],
      role: '',
      country: '',
      teamSize: '',
    },
    validators: {
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      await create({
        variables: {
          input: {
            companyKind: value.kind,
            role: value.role,
            country: value.country,
            teamSize: value.teamSize,
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
      <form.Field name="kind" mode="array">
        {(field) => (
          <div className="mx-auto space-y-3">
            <Label htmlFor={field.name}>What kind of company are you</Label>
            <div className="flex flex-wrap gap-1 mt-1">
              {companyTypes.map(({ label, value }) => {
                return (
                  <button
                    type="button"
                    key={value}
                    onClick={() => {
                      if (!field.state.value.includes(value)) {
                        field.pushValue(value);
                      } else {
                        field.removeValue(field.state.value.indexOf(value));
                      }
                    }}
                    data-state={field.state.value.includes(value) && 'active'}
                    className="rounded-md data-[state=active]:text-white  data-[state=active]:dark:bg-blue-500 data-[state=active]:bg-blue-500  p-2 text-sm font-medium text-gray-700 bg-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-all duration-200 ease-in-out active:scale-[0.96]"
                  >
                    {label}
                  </button>
                );
              })}
            </div>
            <InputMessage>
              {field.state.meta.errors
                ? field.state.meta.errors.join(', ')
                : null}
            </InputMessage>
          </div>
        )}
      </form.Field>

      <form.Field name="teamSize">
        {(field) => (
          <div className="mx-auto space-y-3">
            <Label htmlFor={field.name}>
              How many people are in your team?
            </Label>
            <Select
              name={field.name}
              value={field.state.value}
              onValueChange={(e) => field.handleChange(e)}
            >
              <SelectTrigger
                id={field.name}
                hasError={!!field.state.meta.errors?.length}
              >
                <SelectValue placeholder="Select a range" />
              </SelectTrigger>
              <SelectContent className="max-h-64">
                {companyTeamSizes.map(({ label, value }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <InputMessage>
              {field.state.meta.errors
                ? field.state.meta.errors.join(', ')
                : null}
            </InputMessage>
          </div>
        )}
      </form.Field>
      <form.Field name="role">
        {(field) => (
          <div className="mx-auto space-y-3">
            <Label htmlFor={field.name}>What&lsquo;s your role</Label>
            <Select
              name={field.name}
              value={field.state.value}
              onValueChange={(e) => field.handleChange(e)}
            >
              <SelectTrigger
                id={field.name}
                hasError={!!field.state.meta.errors?.length}
              >
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent className="max-h-64">
                {userRoles.map(({ label, value }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <InputMessage>
              {field.state.meta.errors
                ? field.state.meta.errors.join(', ')
                : null}
            </InputMessage>
          </div>
        )}
      </form.Field>
      <form.Field name="country">
        {(field) => (
          <div className="mx-auto space-y-3">
            <Label htmlFor={field.name}>What&lsquo;s your role</Label>
            <Select
              name={field.name}
              value={field.state.value}
              onValueChange={(e) => field.handleChange(e)}
            >
              <SelectTrigger
                id={field.name}
                hasError={!!field.state.meta.errors?.length}
              >
                <SelectValue placeholder="Select a country" />
              </SelectTrigger>
              <SelectContent className="max-h-64">
                {countries.map(({ label, value }) => (
                  <SelectItem key={value} value={value}>
                    <span className="flex items-center gap-x-2">
                      <span>{getUnicodeFlagIcon(value)}</span>
                      {label}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <InputMessage>
              {field.state.meta.errors
                ? field.state.meta.errors.join(', ')
                : null}
            </InputMessage>
          </div>
        )}
      </form.Field>
      <p className="mt-6 text-gray-700 text-xs dark:text-gray-500 text-center  prose prose-neutral dark:prose-invert">
        We collect this information to better understand our customers and
        enhance our services. Your data remains private and is used solely to
        improve your experience.{' '}
      </p>
      <div className="mt-6 grid space-y-3">
        <Button type="submit" isLoading={loading || pending}>
          Continue
        </Button>
        <Button variant="secondary" asChild>
          <Link href="/onboarding/team">Skip</Link>
        </Button>
      </div>
    </form>
  );
}
