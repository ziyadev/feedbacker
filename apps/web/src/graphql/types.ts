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

export type Query = {
  __typename?: 'Query';
  /** Get the currently logged in user */
  user: UserModel;
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

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'Query', user: { __typename?: 'UserModel', id: string, name: string, email: string, emailVerified: boolean, createdAt: any, updatedAt: any, avatar?: string | null } };

export type GetUserProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserProfileQuery = { __typename?: 'Query', user: { __typename?: 'UserModel', id: string, name: string, email: string, emailVerified: boolean, createdAt: any, updatedAt: any, avatar?: string | null } };
