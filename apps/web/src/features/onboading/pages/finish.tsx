'use client';

import { FormHeader } from '@/features/ui/form-header';
import CompanyForm from '../forms/finish-form';
export default function FinishPage() {
  return (
    <main className="mx-auto p-4">
      <FormHeader
        title="We are ready to go! 🚀"
        description="Your feedback system is live. Get ready for insights, surprises, and the occasional unexpected opinion."
      />
      <CompanyForm />
    </main>
  );
}
