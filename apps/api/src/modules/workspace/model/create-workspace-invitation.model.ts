import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { WorkspaceInvitationModel } from './workspace-invitation.model';

export enum CreateWorkspaceInvitationErrorCode {
  WORKSPACE_NOT_FOUND = 'WORKSPACE_NOT_FOUND',
  EMAIL_ALREADY_INVITED = 'EMAIL_ALREADY_INVITED',
  EMAIL_ALREADY_MEMBER = 'EMAIL_ALREADY_MEMBER',
  YOU_CANNOT_INVITE_YOURSELF = 'YOU_CANNOT_INVITE_YOURSELF',
}
registerEnumType(CreateWorkspaceInvitationErrorCode, {
  name: 'CreateWorkspaceInvitationErrorCode',
});

@ObjectType()
export class CreateWorkspaceInvitationError {
  @Field(() => CreateWorkspaceInvitationErrorCode)
  code: CreateWorkspaceInvitationErrorCode;

  @Field(() => String)
  message: string;
}

@ObjectType()
export class CreateWorkspaceInvitationModel {
  @Field(() => WorkspaceInvitationModel, {
    nullable: true,
    description: 'Invition ',
  })
  invitation: WorkspaceInvitationModel;
  @Field(() => [CreateWorkspaceInvitationError], {
    nullable: true,
    description: 'Create workspace invitation errors',
  })
  errors: CreateWorkspaceInvitationError[];
}
