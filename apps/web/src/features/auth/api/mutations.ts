import { gql } from '@/graphql/gql';

export const CREDENTIALS_LOGIN = gql(`
  mutation CredentialsLogin($input: CredentialsLoginDto!) {
      credentialsLogin(input: $input) {
          user {
              id
              name
              email
              emailVerified
              createdAt
              updatedAt
              avatar
          }
          errors {
              code
              message
          }
      }
  }

`);
export const CREDENTIALS_SIGN_UP = gql(`
  mutation CredentialsSignUp($input: CredentialsSignUpDto!) {
      credentialsSignUp(input: $input) {
          user {
              id
              name
              email
              emailVerified
              createdAt
              updatedAt
              avatar
          }
          errors {
              code
              message
          }
      }
  }
`);
export const SEND_RESET_PASSWORD_LINK = gql(`
  mutation SendResetPasswordLink($input: SendEmailResetPasswordLinkDto!) {
      sendResetPasswordLink(input: $input) {
          success
          errors {
              code
              message
          }
      }
  }
`);
