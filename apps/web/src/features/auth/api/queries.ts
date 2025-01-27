import { gql } from '@/graphql/gql';
export const GET_USER = gql(`
  query GetUser {
    user {
      id
      name
      email
      emailVerified
      createdAt
      updatedAt
      avatar
    }
  }
`);
