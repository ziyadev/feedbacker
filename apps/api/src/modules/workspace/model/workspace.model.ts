import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class WorkspaceModel {
  @Field(() => ID, {
    description: 'Unique identifier of the workspace',
  })
  id: string;
  @Field(() => String, {
    description: 'Name of the workspace',
  })
  name: string;
  @Field(() => String, {
    description: 'URL-friendly identifier for the workspace',
  })
  slug: string;
  @Field(() => String, {
    nullable: true,
    description: 'Optional description of the workspace',
  })
  description: string;
  @Field(() => String, {
    nullable: true,
    description: 'URL of the workspace avatar image',
  })
  avatar: string;

  @Field(() => String, {
    description: 'Timestamp when the workspace was created',
  })
  createdAt: Date;

  @Field(() => String, {
    description: 'Timestamp when the workspace was last updated',
  })
  updatedAt: Date;
}
