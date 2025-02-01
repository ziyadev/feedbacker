'use client';

import { FormHeader } from '@/features/ui/form-header';
import CreateWorkspaceForm from '../forms/create-workspace-form';
export default function WorkspacePage() {
  return (
    <main className="mx-auto p-4">
      <FormHeader
        title="Let's create your first ready-to-use workspace"
        description="Workspaces are the foundation of Insights. They are a collection of products, employees, and infrastructure that you can use to get started."
      />
      <CreateWorkspaceForm />
    </main>
  );
}
