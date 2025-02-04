import { gql } from '@/graphql/gql';

export const GET_CURRENT_WORKSPACE = gql(`
  query Workspace {
      workspace {
          id
          name
          slug
          description
          avatar
          createdAt
          updatedAt
          role
      }
  }
  `);
