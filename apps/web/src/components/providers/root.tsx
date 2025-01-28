'use client';

import { client } from '@/graphql/client';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '../ui';

export default function RootProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider defaultTheme="system" attribute="class">
      <ApolloProvider client={client}>{children}
        <Toaster />

      </ApolloProvider>
    </ThemeProvider>
  );
}
