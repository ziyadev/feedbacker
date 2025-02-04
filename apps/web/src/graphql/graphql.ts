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

export type CreateUserProfileDto = {
  companyKind: Array<Scalars['String']['input']>;
  country: Scalars['String']['input'];
  role: Scalars['String']['input'];
  teamSize: Scalars['String']['input'];
};

export type CreateUserProfileError = {
  __typename?: 'CreateUserProfileError';
  code: CreateUserProfileErrorCode;
  message: Scalars['String']['output'];
};

export enum CreateUserProfileErrorCode {
  AlreadyExists = 'ALREADY_EXISTS'
}

export type CreateUserProfileModel = {
  __typename?: 'CreateUserProfileModel';
  /** Create user profile errors */
  errors?: Maybe<Array<CreateUserProfileError>>;
  /** Profile */
  profile?: Maybe<UserProfileModel>;
};

export type CreateWorkspaceDto = {
  /** Avatar of the workspace */
  avatar?: InputMaybe<Scalars['String']['input']>;
  /** Description of the workspace */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Name of the workspace */
  name: Scalars['String']['input'];
  /** Slug of the workspace it must be unique */
  slug: Scalars['String']['input'];
};

export type CreateWorkspaceError = {
  __typename?: 'CreateWorkspaceError';
  code: CreateWorkspaceErrorCode;
  message: Scalars['String']['output'];
};

export enum CreateWorkspaceErrorCode {
  SlugAlreadyTaken = 'SLUG_ALREADY_TAKEN'
}

export type CreateWorkspaceInvitationDto = {
  email: Scalars['String']['input'];
  role: WorkspaceMemberRole;
};

export type CreateWorkspaceInvitationError = {
  __typename?: 'CreateWorkspaceInvitationError';
  code: CreateWorkspaceInvitationErrorCode;
  message: Scalars['String']['output'];
};

export enum CreateWorkspaceInvitationErrorCode {
  EmailAlreadyInvited = 'EMAIL_ALREADY_INVITED',
  EmailAlreadyMember = 'EMAIL_ALREADY_MEMBER',
  WorkspaceNotFound = 'WORKSPACE_NOT_FOUND',
  YouCannotInviteYourself = 'YOU_CANNOT_INVITE_YOURSELF'
}

export type CreateWorkspaceInvitationModel = {
  __typename?: 'CreateWorkspaceInvitationModel';
  /** Create workspace invitation errors */
  errors?: Maybe<Array<CreateWorkspaceInvitationError>>;
  /** Invition  */
  invitation?: Maybe<WorkspaceInvitationModel>;
};

export type CreateWorkspaceModel = {
  __typename?: 'CreateWorkspaceModel';
  /** Create workspace errors */
  errors?: Maybe<Array<CreateWorkspaceError>>;
  /** Workspace */
  workspace?: Maybe<WorkspaceModel>;
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

export type CurrentWorkspaceDto = {
  __typename?: 'CurrentWorkspaceDto';
  /** URL of the workspace avatar image */
  avatar?: Maybe<Scalars['String']['output']>;
  /** Timestamp when the workspace was created */
  createdAt: Scalars['String']['output'];
  /** Optional description of the workspace */
  description?: Maybe<Scalars['String']['output']>;
  /** Unique identifier of the workspace */
  id: Scalars['ID']['output'];
  /** Name of the workspace */
  name: Scalars['String']['output'];
  role: WorkspaceMemberRole;
  /** URL-friendly identifier for the workspace */
  slug: Scalars['String']['output'];
  /** Timestamp when the workspace was last updated */
  updatedAt: Scalars['String']['output'];
};

export enum FileType {
  ImageGif = 'IMAGE_GIF',
  ImageJpeg = 'IMAGE_JPEG',
  ImagePng = 'IMAGE_PNG',
  VideoMp4 = 'VIDEO_MP4',
  VideoWebm = 'VIDEO_WEBM'
}

export type GetPresignedUrlDto = {
  fileName: Scalars['String']['input'];
  mimeType: FileType;
};

export type IsWorkspaceSlugValidDto = {
  /** Slug of the workspace it must be unique */
  slug: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Changes user password using a valid reset token */
  changePassword: Scalars['Boolean']['output'];
  /** Validates if a password reset token is valid and not expired */
  checkResetPasswordToken: Scalars['Boolean']['output'];
  createUserProfile: CreateUserProfileModel;
  /** Create a new workspace */
  createWorkspace: CreateWorkspaceModel;
  /** Authenticates a user with credentials and returns user information */
  credentialsLogin: CredentialsLoginModel;
  /** Creates a new user account with the provided credentials and returns user information */
  credentialsSignUp: CredentialsSignUpModel;
  getUploadPresignedUrl: Scalars['String']['output'];
  /** Check if a workspace slug is valid or not */
  isWorkspaceSlugValid: Scalars['Boolean']['output'];
  /** Sends a password reset link to the provided email address */
  sendResetPasswordLink: SendResetPasswordEmailModel;
  /** Send a workspace invitation */
  sendWorkspaceInvitation: CreateWorkspaceInvitationModel;
};


export type MutationChangePasswordArgs = {
  input: ChangePasswordDto;
};


export type MutationCheckResetPasswordTokenArgs = {
  input: CheckResetPasswordTokenDto;
};


export type MutationCreateUserProfileArgs = {
  input: CreateUserProfileDto;
};


export type MutationCreateWorkspaceArgs = {
  input: CreateWorkspaceDto;
};


export type MutationCredentialsLoginArgs = {
  input: CredentialsLoginDto;
};


export type MutationCredentialsSignUpArgs = {
  input: CredentialsSignUpDto;
};


export type MutationGetUploadPresignedUrlArgs = {
  input: GetPresignedUrlDto;
};


export type MutationIsWorkspaceSlugValidArgs = {
  input: IsWorkspaceSlugValidDto;
};


export type MutationSendResetPasswordLinkArgs = {
  input: SendEmailResetPasswordLinkDto;
};


export type MutationSendWorkspaceInvitationArgs = {
  input: CreateWorkspaceInvitationDto;
};

export type Query = {
  __typename?: 'Query';
  /** Get the currently logged in user */
  user: UserModel;
  /** Get the currently workspace */
  workspace: CurrentWorkspaceDto;
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

export type UserProfileModel = {
  __typename?: 'UserProfileModel';
  /** Type of company or organization */
  companyKind: Array<Scalars['String']['output']>;
  /** Country where the person is located */
  country: Scalars['String']['output'];
  /** Role or job title of the profile owner */
  role: Scalars['String']['output'];
  /** Number of people on the team */
  teamSize: Scalars['String']['output'];
};

export type WorkspaceInvitationModel = {
  __typename?: 'WorkspaceInvitationModel';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  role: WorkspaceMemberRole;
  status: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  workspaceId: Scalars['String']['output'];
};

export enum WorkspaceMemberRole {
  Admin = 'ADMIN',
  Editor = 'EDITOR',
  Viewer = 'VIEWER'
}

export type WorkspaceModel = {
  __typename?: 'WorkspaceModel';
  /** URL of the workspace avatar image */
  avatar?: Maybe<Scalars['String']['output']>;
  /** Timestamp when the workspace was created */
  createdAt: Scalars['String']['output'];
  /** Optional description of the workspace */
  description?: Maybe<Scalars['String']['output']>;
  /** Unique identifier of the workspace */
  id: Scalars['ID']['output'];
  /** Name of the workspace */
  name: Scalars['String']['output'];
  /** URL-friendly identifier for the workspace */
  slug: Scalars['String']['output'];
  /** Timestamp when the workspace was last updated */
  updatedAt: Scalars['String']['output'];
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

export type CreateUserProfileMutationVariables = Exact<{
  input: CreateUserProfileDto;
}>;


export type CreateUserProfileMutation = { __typename?: 'Mutation', createUserProfile: { __typename?: 'CreateUserProfileModel', profile?: { __typename?: 'UserProfileModel', companyKind: Array<string>, role: string, teamSize: string, country: string } | null, errors?: Array<{ __typename?: 'CreateUserProfileError', code: CreateUserProfileErrorCode, message: string }> | null } };

export type GetUserProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserProfileQuery = { __typename?: 'Query', user: { __typename?: 'UserModel', id: string, name: string, email: string, emailVerified: boolean, createdAt: any, updatedAt: any, avatar?: string | null } };

export type CreateWorkspaceMutationVariables = Exact<{
  input: CreateWorkspaceDto;
}>;


export type CreateWorkspaceMutation = { __typename?: 'Mutation', createWorkspace: { __typename?: 'CreateWorkspaceModel', workspace?: { __typename?: 'WorkspaceModel', id: string, name: string, slug: string, description?: string | null, avatar?: string | null, createdAt: string, updatedAt: string } | null, errors?: Array<{ __typename?: 'CreateWorkspaceError', code: CreateWorkspaceErrorCode, message: string }> | null } };

export type IsWorkspaceSlugValidMutationVariables = Exact<{
  input: IsWorkspaceSlugValidDto;
}>;


export type IsWorkspaceSlugValidMutation = { __typename?: 'Mutation', isWorkspaceSlugValid: boolean };

export type SendWorkspaceInvitationMutationVariables = Exact<{
  input: CreateWorkspaceInvitationDto;
}>;


export type SendWorkspaceInvitationMutation = { __typename?: 'Mutation', sendWorkspaceInvitation: { __typename?: 'CreateWorkspaceInvitationModel', invitation?: { __typename?: 'WorkspaceInvitationModel', id: string, workspaceId: string, email: string, role: WorkspaceMemberRole, status: string, createdAt: any, updatedAt: any } | null, errors?: Array<{ __typename?: 'CreateWorkspaceInvitationError', code: CreateWorkspaceInvitationErrorCode, message: string }> | null } };

export type WorkspaceQueryVariables = Exact<{ [key: string]: never; }>;


export type WorkspaceQuery = { __typename?: 'Query', workspace: { __typename?: 'CurrentWorkspaceDto', id: string, name: string, slug: string, description?: string | null, avatar?: string | null, createdAt: string, updatedAt: string, role: WorkspaceMemberRole } };


export const CredentialsLoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CredentialsLogin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CredentialsLoginDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"credentialsLogin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"emailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<CredentialsLoginMutation, CredentialsLoginMutationVariables>;
export const CredentialsSignUpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CredentialsSignUp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CredentialsSignUpDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"credentialsSignUp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"emailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<CredentialsSignUpMutation, CredentialsSignUpMutationVariables>;
export const SendResetPasswordLinkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendResetPasswordLink"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SendEmailResetPasswordLinkDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendResetPasswordLink"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<SendResetPasswordLinkMutation, SendResetPasswordLinkMutationVariables>;
export const GetUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"emailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>;
export const CreateUserProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUserProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserProfileDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUserProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"companyKind"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"teamSize"}},{"kind":"Field","name":{"kind":"Name","value":"country"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<CreateUserProfileMutation, CreateUserProfileMutationVariables>;
export const GetUserProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"emailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]} as unknown as DocumentNode<GetUserProfileQuery, GetUserProfileQueryVariables>;
export const CreateWorkspaceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateWorkspace"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateWorkspaceDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createWorkspace"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workspace"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<CreateWorkspaceMutation, CreateWorkspaceMutationVariables>;
export const IsWorkspaceSlugValidDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IsWorkspaceSlugValid"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IsWorkspaceSlugValidDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isWorkspaceSlugValid"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<IsWorkspaceSlugValidMutation, IsWorkspaceSlugValidMutationVariables>;
export const SendWorkspaceInvitationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendWorkspaceInvitation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateWorkspaceInvitationDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendWorkspaceInvitation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"invitation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"workspaceId"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<SendWorkspaceInvitationMutation, SendWorkspaceInvitationMutationVariables>;
export const WorkspaceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Workspace"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workspace"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]} as unknown as DocumentNode<WorkspaceQuery, WorkspaceQueryVariables>;