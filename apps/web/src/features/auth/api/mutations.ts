import { gql } from '@/graphql/gql';

export const CREDENTIALS_LOGIN = gql(`
  mutation CredentialLogin($input: CredentialsLoginDto!) {
    credentialLogin(input: $input) {
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
export const CREDENTIALS_SIGN_UP = gql(`
  mutation CredentialSignup($input: CredentialsSignUpDto!) {
    credentialSignUp(input: $input) {
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
