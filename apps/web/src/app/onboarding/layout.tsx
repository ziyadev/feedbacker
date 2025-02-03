'use client';
import useScroll from '@/components/lib/useScroll';
import { Button } from '@/components/ui';
import { LogoLink } from '@/components/ui/logo-link';
import { Step, onboardingSteps } from '@/features/onboading/hooks/useOnbording';
import { cx } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import React from 'react';

interface StepProgressProps {
  onboardingSteps: Step[];
}

const StepProgress = ({ onboardingSteps }: StepProgressProps) => {
  const pathname = usePathname();
  const currentStepIndex = onboardingSteps.findIndex((step) =>
    pathname.startsWith(step.href)
  );

  return (
    <div aria-label="Onboarding progress">
      <ol className="mx-auto flex w-24 flex-nowrap gap-1 md:w-fit">
        {onboardingSteps.map((step, index) => (
          <li
            key={step.name}
            className={cx(
              'h-1 w-6 rounded-full',
              index < currentStepIndex
                ? 'bg-blue-500'
                : 'bg-gray-300 dark:bg-gray-700',
              index === currentStepIndex && 'bg-gray-950 dark:bg-white w-12'
            )}
          >
            <span className="sr-only">
              {step.name}{' '}
              {index < currentStepIndex
                ? 'completed'
                : index === currentStepIndex
                ? 'current'
                : ''}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
};

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const scrolled = useScroll(15);

  return (
    <>
      <header
        className={cx(
          'fixed inset-x-0 top-0 isolate z-50 flex items-center justify-between border-b border-gray-200 px-4 transition-all md:grid md:grid-cols-[200px_auto_200px] md:px-6 dark:border-gray-900 ',
          scrolled ? 'h-12' : 'h-20'
        )}
      >
        <div
          className="hidden flex-nowrap items-center gap-0.5 md:flex"
          aria-hidden="true"
        >
          <LogoLink
            className="w-7 p-px text-blue-500 dark:text-blue-500"
            aria-hidden="true"
          />
          <span className="mt-0.5 text-lg font-semibold text-gray-900 dark:text-gray-50">
            Insights
          </span>
        </div>
        <StepProgress onboardingSteps={onboardingSteps} />
        <Button variant="ghost" className="ml-auto w-fit" asChild>
          <a href="/reports">Skip to dashboard</a>
        </Button>
      </header>
      <main id="main-content" className="mx-auto mb-20 mt-28 max-w-lg">
        {children}
      </main>
    </>
  );
};

export default Layout;
