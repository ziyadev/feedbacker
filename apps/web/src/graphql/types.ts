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
  Timestamp: { input: any; output: any; }
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

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars['Timestamp']['input']>;
  gt?: InputMaybe<Scalars['Timestamp']['input']>;
  gte?: InputMaybe<Scalars['Timestamp']['input']>;
  in?: InputMaybe<Array<Scalars['Timestamp']['input']>>;
  lt?: InputMaybe<Scalars['Timestamp']['input']>;
  lte?: InputMaybe<Scalars['Timestamp']['input']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['Timestamp']['input']>>;
};

export type FeedbackModel = {
  __typename?: 'FeedbackModel';
  comment: Scalars['String']['output'];
  country: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  metadata?: Maybe<Array<KeyValuePair>>;
  pageUrl: Scalars['String']['output'];
  priority: FeedbackPriority;
  rating?: Maybe<Scalars['Int']['output']>;
  status: FeedbackStatus;
  summary?: Maybe<Scalars['String']['output']>;
  type: FeedbackType;
  updatedAt: Scalars['DateTime']['output'];
  userMetadata?: Maybe<Array<KeyValuePair>>;
};

export type FeedbackModelEdge = {
  __typename?: 'FeedbackModelEdge';
  cursor: Scalars['String']['output'];
  node: FeedbackModel;
};

export type FeedbackPaginationDto = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  take: Scalars['Int']['input'];
};

export enum FeedbackPriority {
  High = 'HIGH',
  Low = 'LOW',
  Neutral = 'NEUTRAL',
  Urgrgent = 'URGRGENT'
}

export type FeedbackPriorityFilter = {
  equals?: InputMaybe<FeedbackPriority>;
  in: Array<FeedbackPriority>;
  notIn: Array<FeedbackPriority>;
};

export enum FeedbackStatus {
  Backlog = 'BACKLOG',
  Closed = 'CLOSED',
  InQa = 'IN_QA',
  Open = 'OPEN',
  Resolved = 'RESOLVED',
  Todo = 'TODO'
}

export type FeedbackStatusFilter = {
  equals?: InputMaybe<FeedbackStatus>;
  in: Array<FeedbackStatus>;
  notIn: Array<FeedbackStatus>;
};

export enum FeedbackType {
  Bug = 'BUG',
  Feature = 'FEATURE',
  General = 'GENERAL',
  Question = 'QUESTION'
}

export type FeedbackTypeFilter = {
  equals?: InputMaybe<FeedbackType>;
  in: Array<FeedbackType>;
  notIn: Array<FeedbackType>;
};

export enum FileType {
  ImageGif = 'IMAGE_GIF',
  ImageJpeg = 'IMAGE_JPEG',
  ImagePng = 'IMAGE_PNG',
  VideoMp4 = 'VIDEO_MP4',
  VideoWebm = 'VIDEO_WEBM'
}

export type GetAllFeedbacksFilterDto = {
  country?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<Scalars['ID']['input']>;
  pageUrl?: InputMaybe<StringFilter>;
  priority?: InputMaybe<FeedbackPriorityFilter>;
  rating?: InputMaybe<IntFilter>;
  status?: InputMaybe<FeedbackStatusFilter>;
  type?: InputMaybe<FeedbackTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type GetAllFeedbacksFilterOrderBy = {
  key: GetAllFeedbacksFilterOrderByKeys;
  type: OrderByType;
};

export enum GetAllFeedbacksFilterOrderByKeys {
  Country = 'COUNTRY',
  CreatedAt = 'CREATED_AT',
  Id = 'ID',
  Priority = 'PRIORITY',
  Rating = 'RATING',
  Status = 'STATUS',
  Type = 'TYPE',
  UpdatedAt = 'UPDATED_AT'
}

export type GetPresignedUrlDto = {
  fileName: Scalars['String']['input'];
  mimeType: FileType;
};

export type IntFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type IsWorkspaceSlugValidDto = {
  /** Slug of the workspace it must be unique */
  slug: Scalars['String']['input'];
};

export type KeyValuePair = {
  __typename?: 'KeyValuePair';
  key: Scalars['String']['output'];
  value: Scalars['String']['output'];
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

export type NestedDateTimeFilter = {
  equals?: InputMaybe<Scalars['Timestamp']['input']>;
  gt?: InputMaybe<Scalars['Timestamp']['input']>;
  gte?: InputMaybe<Scalars['Timestamp']['input']>;
  in?: InputMaybe<Array<Scalars['Timestamp']['input']>>;
  lt?: InputMaybe<Scalars['Timestamp']['input']>;
  lte?: InputMaybe<Scalars['Timestamp']['input']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['Timestamp']['input']>>;
};

export type NestedIntFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  search?: InputMaybe<Scalars['String']['input']>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export enum OrderByType {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type PaginatedFeedbackModel = {
  __typename?: 'PaginatedFeedbackModel';
  edges?: Maybe<Array<FeedbackModelEdge>>;
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  nodes?: Maybe<Array<FeedbackModel>>;
  startCursor?: Maybe<Scalars['String']['output']>;
  totalCount: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  getFeedbacks: PaginatedFeedbackModel;
  /** Get the currently logged in user */
  user: UserModel;
  /** Get the currently workspace */
  workspace: CurrentWorkspaceDto;
};


export type QueryGetFeedbacksArgs = {
  filter?: InputMaybe<GetAllFeedbacksFilterDto>;
  orderBy?: InputMaybe<GetAllFeedbacksFilterOrderBy>;
  pagination?: InputMaybe<FeedbackPaginationDto>;
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

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

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  search?: InputMaybe<Scalars['String']['input']>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type UserModel = {
  __typename?: 'UserModel';
  /** URL of the user's profile avatar image */
  avatar?: Maybe<Scalars['String']['output']>;
  /** Timestamp of when the user account was created */
  createdAt: Scalars['Timestamp']['output'];
  /** Email address of the user */
  email: Scalars['String']['output'];
  /** Whether the user has verified their email address */
  emailVerified: Scalars['Boolean']['output'];
  /** Unique identifier for the user */
  id: Scalars['ID']['output'];
  /** Full name of the user */
  name: Scalars['String']['output'];
  /** Timestamp of when the user account was last updated */
  updatedAt: Scalars['Timestamp']['output'];
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
  createdAt: Scalars['Timestamp']['output'];
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  role: WorkspaceMemberRole;
  status: Scalars['String']['output'];
  updatedAt: Scalars['Timestamp']['output'];
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

export type GetFeedbacksQueryVariables = Exact<{
  filter?: InputMaybe<GetAllFeedbacksFilterDto>;
  pagination?: InputMaybe<FeedbackPaginationDto>;
  orderBy?: InputMaybe<GetAllFeedbacksFilterOrderBy>;
}>;


export type GetFeedbacksQuery = { __typename?: 'Query', getFeedbacks: { __typename?: 'PaginatedFeedbackModel', totalCount: number, hasNextPage: boolean, startCursor?: string | null, endCursor?: string | null, nodes?: Array<{ __typename?: 'FeedbackModel', id: string, rating?: number | null, type: FeedbackType, comment: string, priority: FeedbackPriority, status: FeedbackStatus, pageUrl: string, country: string, summary?: string | null, createdAt: any, updatedAt: any, userMetadata?: Array<{ __typename?: 'KeyValuePair', key: string, value: string }> | null, metadata?: Array<{ __typename?: 'KeyValuePair', key: string, value: string }> | null }> | null } };

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
