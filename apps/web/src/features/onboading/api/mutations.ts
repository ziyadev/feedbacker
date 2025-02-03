import { gql } from '@/graphql/gql';

export const CREATE_USER_PROFILE_MUTATION = gql(`
  mutation CreateUserProfile($input: CreateUserProfileDto!) {
      createUserProfile(input: $input) {
          profile {
              companyKind
              role
              teamSize
              country
          }
          errors {
              code
              message
          }
      }
  }
`);
