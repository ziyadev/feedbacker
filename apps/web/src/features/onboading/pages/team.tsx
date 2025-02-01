'use client';

import { FormHeader } from '@/features/ui/form-header';
import TeamForm from '../forms/team-form';
export default function TeamPage() {
  return (
    <main className="mx-auto p-4">
      <FormHeader
        title="Send and invite team members"
        description="Enter the email addresses of the team members you want to invite and choose the roles they will have."
      />
      <TeamForm />
    </main>
  );
}
