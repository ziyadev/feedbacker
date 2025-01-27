import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { env } from '@/env.mjs';
export const client = new ApolloClient({
  link: new HttpLink({
    uri: `${env.NEXT_PUBLIC_API_URL}/graphql`,
    credentials: 'include',
  }),
  cache: new InMemoryCache(),
});
