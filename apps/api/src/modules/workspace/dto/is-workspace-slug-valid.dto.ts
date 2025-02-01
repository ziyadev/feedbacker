import { Field, InputType } from '@nestjs/graphql';
import { MaxLength, MinLength } from 'class-validator';

@InputType()
export class IsWorkspaceSlugValidDto {
  @Field({
    description: 'Slug of the workspace it must be unique',
  })
  @MinLength(3)
  @MaxLength(50)
  slug: string;
}
