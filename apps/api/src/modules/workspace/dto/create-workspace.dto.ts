import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateWorkspaceDto {
  @Field({
    description: 'Name of the workspace',
  })
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(30)
  name: string;

  @Field({
    description: 'Slug of the workspace it must be unique',
  })
  @MinLength(3)
  @MaxLength(50)
  slug: string;

  @Field({
    description: 'Description of the workspace',
    nullable: true,
  })
  @IsOptional()
  @MinLength(3)
  @MaxLength(50)
  description: string;

  @Field({
    description: 'Avatar of the workspace',
    nullable: true,
  })
  @IsOptional()
  avatar: string;
}
