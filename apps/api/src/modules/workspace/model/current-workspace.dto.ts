import { Field, IntersectionType, ObjectType } from '@nestjs/graphql';
import { WorkspaceMemberRole } from './workspace-member.model';
import { WorkspaceModel } from './workspace.model';

@ObjectType()
class AdditionType {

  @Field(() => WorkspaceMemberRole)
  role:WorkspaceMemberRole;
}

@ObjectType()
export class CurrentWorkspaceDto extends IntersectionType(
  WorkspaceModel,
  AdditionType
) {}
