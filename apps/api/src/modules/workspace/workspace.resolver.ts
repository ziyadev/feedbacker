import { WorkspaceSessionData } from '@/common/config/sessoin.config';
import { Session } from '@/common/decorators/session.decorator';
import { Workspace } from '@/common/decorators/workspace.decorator';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { SessionData } from 'express-session';
import { Auth } from '../auth/decorator/auth.decorator';
import { WorkspaceAuth } from '../auth/decorator/workspace.decorator';
import { CreateWorkspaceInvitationDto } from './dto/create-workspace-invitation.dto';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { IsWorkspaceSlugValidDto } from './dto/is-workspace-slug-valid.dto';
import { CreateWorkspaceInvitationModel } from './model/create-workspace-invitation.model';
import { CreateWorkspaceModel } from './model/create-workspace.model';
import { WorkspaceMemberRole } from './model/workspace-member.model';
import { WorkspaceService } from './workspace.service';
@Resolver()
export class WorkspaceResolver {
  constructor(private readonly workspaceService: WorkspaceService) {}
  @Auth()
  @Mutation(() => CreateWorkspaceModel, {
    description: 'Create a new workspace',
  })
  async createWorkspace(
    @Args('input') input: CreateWorkspaceDto,
    @Session() session: SessionData
  ): Promise<CreateWorkspaceModel> {
    return this.workspaceService.handleCreateWorkspace(session, input);
  }
  @Auth()
  @Mutation(() => Boolean, {
    description: 'Check if a workspace slug is valid or not',
  })
  async isWorkspaceSlugValid(
    @Args('input') input: IsWorkspaceSlugValidDto
  ): Promise<boolean> {
    return this.workspaceService.handleIsWorkspaceSlugValid(input);
  }

  @Auth()
  @WorkspaceAuth({
    roles: [WorkspaceMemberRole.ADMIN], // only admin can invite
  })
  @Mutation(() => CreateWorkspaceInvitationModel, {
    description: 'Send a workspace invitation',
  })
  async sendWorkspaceInvitation(
    @Args('input') input: CreateWorkspaceInvitationDto,
    @Workspace() workspace: WorkspaceSessionData
  ): Promise<CreateWorkspaceInvitationModel> {
    return this.workspaceService.handleSendWorkspaceInvitation(
      workspace.id,
      input
    );
  }
}
