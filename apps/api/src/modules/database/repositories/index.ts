import { AccountRepository } from './account.repository';
import { TokenRepository } from './token.repository';
import { UserRepository } from './user.repository';
import { WorkspaceInvitationRepository } from './workspace-invitation.repository';
import { WorkspaceMemberRepository } from './workspace-member.repository';
import { WorkspaceRepository } from './workspace.repository';

export const Repositories = [
  UserRepository,
  AccountRepository,
  TokenRepository,
  WorkspaceRepository,
  WorkspaceMemberRepository,
  WorkspaceInvitationRepository,
];
