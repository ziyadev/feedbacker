import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

export interface Step {
  name: string;
  href: string;
}

export const onboardingSteps: Step[] = [
  { name: 'create-workspace', href: '/onboarding/workspace' },
  { name: 'company', href: '/onboarding/company' },
  { name: 'team', href: '/onboarding/team' },
  { name: 'finish', href: '/onboarding/finish' },
] as const;

export const useOnboarding = () => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const nextStep = (stepName: (typeof onboardingSteps)[number]['name']) => {
    startTransition(() => {
      const nextStep = onboardingSteps.find((s) => s.name === stepName);
      if (nextStep) {
        router.push(nextStep.href);
      }
    });
  };
  return {
    nextStep,
    pending,
  };
};
