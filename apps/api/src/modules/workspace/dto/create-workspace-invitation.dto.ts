import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsEnum } from 'class-validator';
import { WorkspaceMemberRole } from '../model/workspace-member.model';

@InputType()
export class CreateWorkspaceInvitationDto {
  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => WorkspaceMemberRole)
  @IsEnum(WorkspaceMemberRole)
  role: WorkspaceMemberRole;
}
