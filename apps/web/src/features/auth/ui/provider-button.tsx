import { useLastLogin } from '@/components/hooks/useLastLogin';
import { Badge, Button } from '@/components/ui';
import { LoadingIcon } from '@/components/ui/icons/loading-icon';
import { useRouter, useSearchParams } from 'next/navigation';
import { ReactNode, useEffect, useState, useTransition } from 'react';

export const ProviderButton = ({
  providerName,
  icon,
  label,
}: {
  providerName: 'google' | 'github';
  icon: ReactNode;
  label: string;
}) => {
  const { value, setValue } = useLastLogin();
  const searchParams = useSearchParams();
  const redirectedProvider = searchParams.get('provider');
  const next = searchParams.get('next');
  const [pending, startTransition] = useTransition();
  const { push } = useRouter();
  const onClick = () => {
    startTransition(() => {
      setValue(providerName);
      push(`/api/auth/${providerName}` + next ? `?next=${next}` : ''); // redirect to the auth provider
    });
  };
  const isLoading = pending || redirectedProvider === providerName;
  const [mounted, setMounted] = useState(false); // Track mount status
  // fix hydration error of useLastLogin
  // Ensure that we only access localStorage after mount (on client)
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return (
    <Button
      disabled={isLoading}
      variant="secondary"
      className="relative "
      onClick={onClick}
    >
      {value === providerName && (
        <Badge className="absolute top-1.2 right-1  " size="xs">
          Racently used
        </Badge>
      )}
      {isLoading ? <LoadingIcon /> : icon}
      {label}
    </Button>
  );
};
