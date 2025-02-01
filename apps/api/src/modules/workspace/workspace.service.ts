import { MutateResultFactory } from '@/common/builders/mutate-result.builder';
import {
    Injectable,
    InternalServerErrorException,
    Logger,
} from '@nestjs/common';
import { WorkspaceRepository } from '../database/repositories/workspace.repository';
import { CreateWorkspaceErrorBuilder } from './builder/create-workspace-error.builder';
import { WorkspaceBuilder } from './builder/workspace.builder';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { CreateWorkspaceModel } from './model/create-workspace.model';

@Injectable()
export class WorkspaceService {
  private logger = new Logger(WorkspaceService.name);
  constructor(private readonly workspaceRepository: WorkspaceRepository) {}

  async handleCreateWorkspace(
    userId: string,
    input: CreateWorkspaceDto
  ): Promise<CreateWorkspaceModel> {
    try {
      const errors = new CreateWorkspaceErrorBuilder();
      // check if slug is unique
      const findWorkspace = await this.workspaceRepository.findUnique({
        where: {
          slug: input.slug,
        },
      });
      if (findWorkspace) {
        return MutateResultFactory.err({
          errors: errors.build(),
          workspace: null,
        });
      }

      const workspace = new WorkspaceBuilder()
        .setName(input.name)
        .setSlug(input.slug)
        .setDescription(input.description)
        .setAvatar(input.avatar)
        .build();
      const createWorkspace = await this.workspaceRepository.create({
        data: {
          name: workspace.name,
          slug: workspace.slug,
          description: workspace.description,
          avatar: workspace.avatar,
          owner: {
            connect: {
              id: userId,
            },
          },
        },
      });

      return MutateResultFactory.ok({
        errors: null,
        workspace: createWorkspace,
      });
    } catch (e) {
      this.logger.error('Error creating workspace', e);
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
