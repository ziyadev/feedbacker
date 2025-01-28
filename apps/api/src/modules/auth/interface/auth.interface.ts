export enum AuthProvider {
  GOOGLE = 'google',
  GITHUB = 'github',
}

export interface OAuthUser {
  provider: AuthProvider;
  providerAccountId: string;
  name: string;
  email: string;
  avatar_url: string;
}
