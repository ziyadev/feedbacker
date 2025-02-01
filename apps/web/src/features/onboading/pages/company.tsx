'use client';

import { FormHeader } from '@/features/ui/form-header';
import FinishForm from '../forms/company-details-form';
export default function FinisPage() {
  return (
    <main className="mx-auto p-4">
      <FormHeader
        title="Tell us about your company"
        description="Workspaces are shared environments where your team can collaborate on same projects."
      />
      <FinishForm />
    </main>
  );
}
