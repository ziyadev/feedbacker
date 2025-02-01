import { Session } from '@/common/decorators/session.decorator';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { SessionData } from 'express-session';
import { Auth } from '../auth/decorator/auth.decorator';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { IsWorkspaceSlugValidDto } from './dto/is-workspace-slug-valid.dto';
import { CreateWorkspaceModel } from './model/create-workspace.model';
import { WorkspaceService } from './workspace.service';
@Resolver()
export class WorkspaceResolver {
  constructor(private readonly workspaceService: WorkspaceService) {}
  @Auth()
  @Mutation(() => CreateWorkspaceModel)
  async createWorkspace(
    @Args('input') input: CreateWorkspaceDto,
    @Session() session: SessionData
  ): Promise<CreateWorkspaceModel> {
    return this.workspaceService.handleCreateWorkspace(session.user.id, input);
  }
  @Auth()
  @Mutation(() => Boolean)
  async isWorkspaceSlugValid(
    @Args('input') input: IsWorkspaceSlugValidDto
  ): Promise<boolean> {
    return this.workspaceService.handleIsWorkspaceSlugValid(input);
  }
}
