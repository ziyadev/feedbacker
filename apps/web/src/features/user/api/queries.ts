import { gql } from '@/graphql/gql';
export const GET_USER_PROFILE = gql(`
  query GetUserProfile {
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
