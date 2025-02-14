'use client';
import { client } from '@/graphql/client';
import { ApolloProvider } from '@apollo/client';
import { Toaster } from '@feedbacker/ui';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import { ThemeProvider } from 'next-themes';
export default function RootProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider defaultTheme="system" attribute="class">
      <ApolloProvider client={client}>
        <Toaster richColors />
        <NuqsAdapter>

        {children}
        </NuqsAdapter>
      </ApolloProvider>
    </ThemeProvider>
  );
}
