import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { WorkspaceModel } from './workspace.model';

export enum CreateWorkspaceErrorCode {
  SLUG_ALREADY_TAKEN = 'SLUG_ALREADY_TAKEN',
}
registerEnumType(CreateWorkspaceErrorCode, {
  name: 'CreateWorkspaceErrorCode',
});

@ObjectType()
export class CreateWorkspaceError {
  @Field(() => CreateWorkspaceErrorCode)
  code: CreateWorkspaceErrorCode;

  @Field(() => String)
  message: string;
}

@ObjectType()
export class CreateWorkspaceModel {
  @Field(() => WorkspaceModel, { nullable: true, description: 'Workspace' })
  workspace: WorkspaceModel;
  @Field(() => [CreateWorkspaceError], {
    nullable: true,
    description: 'Create workspace errors',
  })
  errors: CreateWorkspaceError[];
}
