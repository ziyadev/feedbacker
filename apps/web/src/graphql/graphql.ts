/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type ChangePasswordDto = {
  newPassword: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type CheckResetPasswordTokenDto = {
  token: Scalars['String']['input'];
};

export type CredentialsLoginDto = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type CredentialsLoginError = {
  __typename?: 'CredentialsLoginError';
  code: CredentialsLoginErrorCode;
  message: Scalars['String']['output'];
};

export enum CredentialsLoginErrorCode {
  InvalidCredentials = 'INVALID_CREDENTIALS'
}

export type CredentialsLoginModel = {
  __typename?: 'CredentialsLoginModel';
  /** Credentials Login error */
  errors?: Maybe<Array<CredentialsLoginError>>;
  /** User */
  user?: Maybe<UserModel>;
};

export type CredentialsSignUpDto = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type CredentialsSignUpError = {
  __typename?: 'CredentialsSignUpError';
  code: CredentialsSignUpErrorCode;
  message: Scalars['String']['output'];
};

export enum CredentialsSignUpErrorCode {
  UserExists = 'USER_EXISTS'
}

export type CredentialsSignUpModel = {
  __typename?: 'CredentialsSignUpModel';
  /** Credentials SignUp error */
  errors?: Maybe<Array<CredentialsSignUpError>>;
  /** User */
  user?: Maybe<UserModel>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Changes user password using a valid reset token */
  changePassword: Scalars['Boolean']['output'];
  /** Validates if a password reset token is valid and not expired */
  checkResetPasswordToken: Scalars['Boolean']['output'];
  /** Authenticates a user with credentials and returns user information */
  credentialsLogin: CredentialsLoginModel;
  /** Creates a new user account with the provided credentials and returns user information */
  credentialsSignUp: CredentialsSignUpModel;
  /** Sends a password reset link to the provided email address */
  sendResetPasswordLink: SendResetPasswordEmailModel;
};


export type MutationChangePasswordArgs = {
  input: ChangePasswordDto;
};


export type MutationCheckResetPasswordTokenArgs = {
  input: CheckResetPasswordTokenDto;
};


export type MutationCredentialsLoginArgs = {
  input: CredentialsLoginDto;
};


export type MutationCredentialsSignUpArgs = {
  input: CredentialsSignUpDto;
};


export type MutationSendResetPasswordLinkArgs = {
  input: SendEmailResetPasswordLinkDto;
};

export type Query = {
  __typename?: 'Query';
  /** Get the currently logged in user */
  user: UserModel;
};

export type SendEmailResetPasswordLinkDto = {
  /** Email address */
  email: Scalars['String']['input'];
};

export type SendResetPasswordEmailError = {
  __typename?: 'SendResetPasswordEmailError';
  code: SendResetPasswordEmailErrorCode;
  message: Scalars['String']['output'];
};

export enum SendResetPasswordEmailErrorCode {
  EmailNotFound = 'EMAIL_NOT_FOUND',
  MaxResetAttemptsExceeded = 'MAX_RESET_ATTEMPTS_EXCEEDED'
}

export type SendResetPasswordEmailModel = {
  __typename?: 'SendResetPasswordEmailModel';
  errors?: Maybe<Array<SendResetPasswordEmailError>>;
  /** Success flag */
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type UserModel = {
  __typename?: 'UserModel';
  /** URL of the user's profile avatar image */
  avatar?: Maybe<Scalars['String']['output']>;
  /** Timestamp of when the user account was created */
  createdAt: Scalars['DateTime']['output'];
  /** Email address of the user */
  email: Scalars['String']['output'];
  /** Whether the user has verified their email address */
  emailVerified: Scalars['Boolean']['output'];
  /** Unique identifier for the user */
  id: Scalars['ID']['output'];
  /** Full name of the user */
  name: Scalars['String']['output'];
  /** Timestamp of when the user account was last updated */
  updatedAt: Scalars['DateTime']['output'];
};

export type CredentialsLoginMutationVariables = Exact<{
  input: CredentialsLoginDto;
}>;


export type CredentialsLoginMutation = { __typename?: 'Mutation', credentialsLogin: { __typename?: 'CredentialsLoginModel', user?: { __typename?: 'UserModel', id: string, name: string, email: string, emailVerified: boolean, createdAt: any, updatedAt: any, avatar?: string | null } | null, errors?: Array<{ __typename?: 'CredentialsLoginError', code: CredentialsLoginErrorCode, message: string }> | null } };

export type CredentialsSignUpMutationVariables = Exact<{
  input: CredentialsSignUpDto;
}>;


export type CredentialsSignUpMutation = { __typename?: 'Mutation', credentialsSignUp: { __typename?: 'CredentialsSignUpModel', user?: { __typename?: 'UserModel', id: string, name: string, email: string, emailVerified: boolean, createdAt: any, updatedAt: any, avatar?: string | null } | null, errors?: Array<{ __typename?: 'CredentialsSignUpError', code: CredentialsSignUpErrorCode, message: string }> | null } };

export type SendResetPasswordLinkMutationVariables = Exact<{
  input: SendEmailResetPasswordLinkDto;
}>;


export type SendResetPasswordLinkMutation = { __typename?: 'Mutation', sendResetPasswordLink: { __typename?: 'SendResetPasswordEmailModel', success?: boolean | null, errors?: Array<{ __typename?: 'SendResetPasswordEmailError', code: SendResetPasswordEmailErrorCode, message: string }> | null } };

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'Query', user: { __typename?: 'UserModel', id: string, name: string, email: string, emailVerified: boolean, createdAt: any, updatedAt: any, avatar?: string | null } };

export type GetUserProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserProfileQuery = { __typename?: 'Query', user: { __typename?: 'UserModel', id: string, name: string, email: string, emailVerified: boolean, createdAt: any, updatedAt: any, avatar?: string | null } };


export const CredentialsLoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CredentialsLogin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CredentialsLoginDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"credentialsLogin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"emailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<CredentialsLoginMutation, CredentialsLoginMutationVariables>;
export const CredentialsSignUpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CredentialsSignUp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CredentialsSignUpDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"credentialsSignUp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"emailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<CredentialsSignUpMutation, CredentialsSignUpMutationVariables>;
export const SendResetPasswordLinkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendResetPasswordLink"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SendEmailResetPasswordLinkDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendResetPasswordLink"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<SendResetPasswordLinkMutation, SendResetPasswordLinkMutationVariables>;
export const GetUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"emailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>;
export const GetUserProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"emailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]} as unknown as DocumentNode<GetUserProfileQuery, GetUserProfileQueryVariables>;