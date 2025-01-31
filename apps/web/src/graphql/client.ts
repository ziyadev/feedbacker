import { ApolloClient, HttpLink, InMemoryCache, from } from '@apollo/client';
import { toast } from 'sonner';

import { onError } from '@apollo/client/link/error';

const errorLink = onError(({ networkError, graphQLErrors }) => {
  if (networkError) {
    toast.error('Network Error', {
      description: networkError.message,
      duration: 5000,
    });
  }
  if (graphQLErrors) {
    graphQLErrors.forEach((error) => {
      if (error.extensions?.code === 'BAD_REQUEST') {
        toast.error('Bad Request', {
          description: 'The server will not process the request.',
          duration: 5000,
        });
      }
      if (error.extensions?.code === 'UNAUTHENTICATED') {
        toast.error('Unauthenticated', {
          description: error.message,
          action: {
            label: 'Go to login',
            onClick: () => (window.location.href = '/auth/sign-in'),
          },
          duration: 6000,
        });
      }
      if (error.extensions?.code === 'FORBIDDEN') {
        toast.error('You are not authorized to access this resource', {
          description: error.message,
          duration: 5000,
        });
      }
      if (error.extensions?.code === 'NOT_FOUND') {
        toast.error('Resource not found', {
          description: error.message,
          action: {
            label: 'Dimiss',
            onClick: () => true,
          },
          duration: 5000,
        });
      }
      if (error.extensions?.code === 'GRAPHQL_VALIDATION_FAILED') {
        toast.error('GraphQL Validation Failed', {
          description:
            "The server's response doesn't match the schema, please send a bug report.",
          action: {
            label: 'Send Bug Report',
            onClick: () => true,
          },
          duration: 5000,
        });
      }
    });
  }
});

const httpLink = new HttpLink({
  uri: `/api/graphql`,
  credentials: 'include',
});
export const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
});
