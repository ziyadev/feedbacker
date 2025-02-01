import {
  Button,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';
import getUnicodeFlagIcon from 'country-flag-icons/unicode';
import Link from 'next/link';
import { useState } from 'react';
import countryList from 'react-select-country-list';

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
export default function CompanyDetailsForm() {
  const countries = countryList().getData();

  const [selected, setSelected] = useState<string[]>([]);
  const handleSelectCountry = (country: string) => {
    if (selected.includes(country)) {
      setSelected((prev) => prev.filter((c) => c !== country));
    } else {
      setSelected((prev) => [...prev, country]);
    }
  };
  return (
    <form onSubmit={() => true} className="mt-4 space-y-3">
      <div className="mx-auto space-y-3">
        <Label htmlFor="name">What kind of company are you</Label>
        <div className="flex flex-wrap gap-1 mt-1">
          {companyTypes.map(({ label, value }) => {
            return (
              <button
                type="button"
                key={value}
                onClick={() => handleSelectCountry(value)}
                data-state={selected.includes(value) && 'active'}
                className="rounded-md data-[state=active]:text-white  data-[state=active]:dark:bg-blue-500 data-[state=active]:bg-blue-500  p-2 text-sm font-medium text-gray-700 bg-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-all duration-200 ease-in-out active:scale-[0.96]"
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mx-auto space-y-3">
        <Label htmlFor="handle">How many people are in your team?</Label>
        <Select>
          <SelectTrigger>
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
      </div>
      <div className="mx-auto space-y-3">
        <Label htmlFor="handle">Country</Label>
        <Select>
          <SelectTrigger>
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
      </div>
      <div className="mt-6 grid space-y-3">
        <Button
          className="disabled:bg-gray-200 disabled:text-gray-500"
          type="submit"
          isLoading={false}
        >
          {false ? 'Submitting...' : 'Continue'}
        </Button>
        <Button variant="secondary" asChild>
          <Link href="/onboarding/workspace">Back</Link>
        </Button>
      </div>
    </form>
  );
}
