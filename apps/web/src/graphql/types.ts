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
  createWorkspace: CreateWorkspaceModel;
  /** Authenticates a user with credentials and returns user information */
  credentialsLogin: CredentialsLoginModel;
  /** Creates a new user account with the provided credentials and returns user information */
  credentialsSignUp: CredentialsSignUpModel;
  getUploadPresignedUrl: Scalars['String']['output'];
  isWorkspaceSlugValid: Scalars['Boolean']['output'];
  /** Sends a password reset link to the provided email address */
  sendResetPasswordLink: SendResetPasswordEmailModel;
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

export type UserProfileModel = {
  __typename?: 'UserProfileModel';
  /** Type of company or organization */
  companyKind: Scalars['String']['output'];
  /** Country where the person is located */
  country: Scalars['String']['output'];
  /** Role or job title of the profile owner */
  role: Scalars['String']['output'];
  /** Number of people on the team */
  teamSize: Scalars['String']['output'];
};

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


export type CreateUserProfileMutation = { __typename?: 'Mutation', createUserProfile: { __typename?: 'CreateUserProfileModel', profile?: { __typename?: 'UserProfileModel', companyKind: string, role: string, teamSize: string, country: string } | null, errors?: Array<{ __typename?: 'CreateUserProfileError', code: CreateUserProfileErrorCode, message: string }> | null } };

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
