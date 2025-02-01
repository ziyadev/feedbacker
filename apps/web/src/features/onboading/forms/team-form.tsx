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
import Link from 'next/link';

const roles = [
  { label: 'Admin', value: 'admin' },
  { label: 'Editor', value: 'editor' },
  { label: 'Viewer', value: 'viewer' },
];
export default function TeamForm() {
  return (
    <form onSubmit={() => true} className="mt-4 space-y-3">
      <div className="mx-auto space-y-3">
        <Label htmlFor="email">Email addresses</Label>
        <div className="grid grid-cols-12 gap-2  p-1">
            <Input
            className="col-span-8 relative"
              placeholder="Enter an email address"
              type="email"
              id="email"
            />

          <Select>
            <SelectTrigger className="col-span-4">
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
        </div>
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
          <Link href="/onboarding/company">Back</Link>
        </Button>
      </div>
    </form>
  );
}
