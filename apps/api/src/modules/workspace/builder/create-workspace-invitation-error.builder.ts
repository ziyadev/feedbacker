import { AbstractErrorsBuilder } from '@/common/builders/abstruct-errors.builder';
import {
  CreateWorkspaceInvitationError,
  CreateWorkspaceInvitationErrorCode,
} from '../model/create-workspace-invitation.model';

export class CreateWorkspaceInvitationErrorBuilder extends AbstractErrorsBuilder<
  CreateWorkspaceInvitationError,
  CreateWorkspaceInvitationErrorCode
> {
  setEmailAlreadyInvited(
    message?: string
  ): CreateWorkspaceInvitationErrorBuilder {
    this.addError({
      code: CreateWorkspaceInvitationErrorCode.EMAIL_ALREADY_INVITED,
      message: message || 'This email is already invited',
    });
    return this;
  }
  setWorkspaceNotFound(
    message?: string
  ): CreateWorkspaceInvitationErrorBuilder {
    this.addError({
      code: CreateWorkspaceInvitationErrorCode.WORKSPACE_NOT_FOUND,
      message: message || 'Workspace not found',
    });
    return this;
  }

  setEmailAlreadyMember(
    message?: string
  ): CreateWorkspaceInvitationErrorBuilder {
    this.addError({
      code: CreateWorkspaceInvitationErrorCode.EMAIL_ALREADY_MEMBER,
      message: message || 'Email already member',
    });
    return this;
  }

  setYouCannotInviteYourself(
    message?: string
  ): CreateWorkspaceInvitationErrorBuilder {
    this.addError({
      code: CreateWorkspaceInvitationErrorCode.YOU_CANNOT_INVITE_YOURSELF,
      message: message || 'You cannot invite yourself',
    });
    return this;
  }
}
