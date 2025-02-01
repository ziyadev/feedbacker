import { Button, Input, Label } from '@/components/ui';
import { RiLoader5Line, RiUploadCloud2Line } from '@remixicon/react';

export default function CreateWorkspaceForm() {
  return (
    <form onSubmit={() => true} className="mt-4 space-y-3">
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
      <div className="mx-auto space-y-3">
        <Label htmlFor="name">Workspace name</Label>
        <Input placeholder="Enter a workspace name" id="name" name="name" />
      </div>
      <div className="mx-auto space-y-3">
        <Label htmlFor="handle">Workspace handle</Label>
        <div className="relative w-full">
          <Input
            placeholder="api.feedbacker.io/my-workspace"
            id="handle"
            name="handle"
          />
          <div
            className={
              'absolute bottom-0 right-0 flex h-full items-center justify-center px-3'
            }
          >
            <RiLoader5Line className="animate-spin" />
          </div>
        </div>
      </div>

      <div className="mt-6 grid">
        <Button
          className="disabled:bg-gray-200 disabled:text-gray-500"
          type="submit"
          isLoading={false}
        >
          {false ? 'Submitting...' : 'Continue'}
        </Button>
      </div>
    </form>
  );
}
