import { AccountRepository } from './account.repository';
import { FeedbackRepository } from './feedback.repository';
import { MediaImageRepository } from './media-image.repository';
import { MediaVideoRepository } from './media-video.repository';
import { MediaRepository } from './media.repository';
import { TokenRepository } from './token.repository';
import { UserProfileRepository } from './user-profile.repository';
import { UserRepository } from './user.repository';
import { WorkspaceInvitationRepository } from './workspace-invitation.repository';
import { WorkspaceMemberRepository } from './workspace-member.repository';
import { WorkspaceRepository } from './workspace.repository';

export const Repositories = [
  UserRepository,
  UserProfileRepository,
  AccountRepository,
  TokenRepository,
  WorkspaceRepository,
  WorkspaceMemberRepository,
  WorkspaceInvitationRepository,
  MediaRepository,
  MediaVideoRepository,
  MediaImageRepository,
  FeedbackRepository,
];
