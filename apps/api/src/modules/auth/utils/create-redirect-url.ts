export default function createRedirectUrl({
  status,
  provider,
  redirectUri,
  error_message,
}: {
  status: 'success' | 'error';
  provider: string;
  error_message?: string;
  redirectUri?: string;
}) {
  const url = new URL(`http://localhost:4000/auth/sign-in`);
  url.searchParams.set('status', status);
  url.searchParams.set('provider', provider);
  if (status === 'error') url.searchParams.set('error_message', error_message);
  if (redirectUri) url.searchParams.set('next', redirectUri);
  return url.toString();
}
