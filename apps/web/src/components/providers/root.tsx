'use client';

import { client } from '@/graphql/client';
import { ApolloProvider } from '@apollo/client';
import { Toaster } from '@feedbacker/ui';
import { ThemeProvider } from 'next-themes';

export default function RootProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider defaultTheme="system" attribute="class">
      <ApolloProvider client={client}>
        {children}
        <Toaster richColors />
      </ApolloProvider>
    </ThemeProvider>
  );
}
