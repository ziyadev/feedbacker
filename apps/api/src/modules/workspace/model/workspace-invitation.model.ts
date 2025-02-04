import { Field, ObjectType } from '@nestjs/graphql';
import { WorkspaceMemberRole } from './workspace-member.model';

export enum WorkspaceInvitationStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}

@ObjectType()
export class WorkspaceInvitationModel {
  @Field(() => String)
  id: string;

  @Field(() => String)
  workspaceId: string;

  @Field(() => String)
  email: string;

  @Field(() => WorkspaceMemberRole)
  role: WorkspaceMemberRole;

  @Field(() => String)
  status: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
