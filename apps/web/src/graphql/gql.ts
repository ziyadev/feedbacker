/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n  mutation CredentialsLogin($input: CredentialsLoginDto!) {\n      credentialsLogin(input: $input) {\n          user {\n              id\n              name\n              email\n              emailVerified\n              createdAt\n              updatedAt\n              avatar\n          }\n          errors {\n              code\n              message\n          }\n      }\n  }\n\n": types.CredentialsLoginDocument,
    "\n  mutation CredentialsSignUp($input: CredentialsSignUpDto!) {\n      credentialsSignUp(input: $input) {\n          user {\n              id\n              name\n              email\n              emailVerified\n              createdAt\n              updatedAt\n              avatar\n          }\n          errors {\n              code\n              message\n          }\n      }\n  }\n": types.CredentialsSignUpDocument,
    "\n  mutation SendResetPasswordLink($input: SendEmailResetPasswordLinkDto!) {\n      sendResetPasswordLink(input: $input) {\n          success\n          errors {\n              code\n              message\n          }\n      }\n  }\n": types.SendResetPasswordLinkDocument,
    "\n  query GetUser {\n    user {\n      id\n      name\n      email\n      emailVerified\n      createdAt\n      updatedAt\n      avatar\n    }\n  }\n": types.GetUserDocument,
    "\n  query GetUserProfile {\n    user {\n      id\n      name\n      email\n      emailVerified\n      createdAt\n      updatedAt\n      avatar\n    }\n  }\n": types.GetUserProfileDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CredentialsLogin($input: CredentialsLoginDto!) {\n      credentialsLogin(input: $input) {\n          user {\n              id\n              name\n              email\n              emailVerified\n              createdAt\n              updatedAt\n              avatar\n          }\n          errors {\n              code\n              message\n          }\n      }\n  }\n\n"): (typeof documents)["\n  mutation CredentialsLogin($input: CredentialsLoginDto!) {\n      credentialsLogin(input: $input) {\n          user {\n              id\n              name\n              email\n              emailVerified\n              createdAt\n              updatedAt\n              avatar\n          }\n          errors {\n              code\n              message\n          }\n      }\n  }\n\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CredentialsSignUp($input: CredentialsSignUpDto!) {\n      credentialsSignUp(input: $input) {\n          user {\n              id\n              name\n              email\n              emailVerified\n              createdAt\n              updatedAt\n              avatar\n          }\n          errors {\n              code\n              message\n          }\n      }\n  }\n"): (typeof documents)["\n  mutation CredentialsSignUp($input: CredentialsSignUpDto!) {\n      credentialsSignUp(input: $input) {\n          user {\n              id\n              name\n              email\n              emailVerified\n              createdAt\n              updatedAt\n              avatar\n          }\n          errors {\n              code\n              message\n          }\n      }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation SendResetPasswordLink($input: SendEmailResetPasswordLinkDto!) {\n      sendResetPasswordLink(input: $input) {\n          success\n          errors {\n              code\n              message\n          }\n      }\n  }\n"): (typeof documents)["\n  mutation SendResetPasswordLink($input: SendEmailResetPasswordLinkDto!) {\n      sendResetPasswordLink(input: $input) {\n          success\n          errors {\n              code\n              message\n          }\n      }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetUser {\n    user {\n      id\n      name\n      email\n      emailVerified\n      createdAt\n      updatedAt\n      avatar\n    }\n  }\n"): (typeof documents)["\n  query GetUser {\n    user {\n      id\n      name\n      email\n      emailVerified\n      createdAt\n      updatedAt\n      avatar\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetUserProfile {\n    user {\n      id\n      name\n      email\n      emailVerified\n      createdAt\n      updatedAt\n      avatar\n    }\n  }\n"): (typeof documents)["\n  query GetUserProfile {\n    user {\n      id\n      name\n      email\n      emailVerified\n      createdAt\n      updatedAt\n      avatar\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;