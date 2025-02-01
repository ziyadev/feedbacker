import { AccountRepository } from './account.repository';
import { TokenRepository } from './token.repository';
import { UserRepository } from './user.repository';
import { WorkspaceRepository } from './workspace.repository';

export const Repositories = [
  UserRepository,
  AccountRepository,
  TokenRepository,
  WorkspaceRepository,
];
