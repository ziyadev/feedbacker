import { MutateResultFactory } from '@/common/builders/mutate-result.builder';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { SessionData } from 'express-session';
import { WorkspaceInvitationRepository } from '../database/repositories/workspace-invitation.repository';
import { WorkspaceMemberRepository } from '../database/repositories/workspace-member.repository';
import { WorkspaceRepository } from '../database/repositories/workspace.repository';
import { EmailService } from '../email/email.service';
import { CreateWorkspaceErrorBuilder } from './builder/create-workspace-error.builder';
import { CreateWorkspaceInvitationErrorBuilder } from './builder/create-workspace-invitation-error.builder';
import { WorkspaceBuilder } from './builder/workspace.builder';
import { CreateWorkspaceInvitationDto } from './dto/create-workspace-invitation.dto';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { IsWorkspaceSlugValidDto } from './dto/is-workspace-slug-valid.dto';
import { CreateWorkspaceInvitationModel } from './model/create-workspace-invitation.model';
import { CreateWorkspaceModel } from './model/create-workspace.model';
import { WorkspaceInvitationStatus } from './model/workspace-invitation.model';
import { WorkspaceMemberRole } from './model/workspace-member.model';

@Injectable()
export class WorkspaceService {
  private readonly logger = new Logger(WorkspaceService.name);
  constructor(
    private readonly workspaceRepository: WorkspaceRepository,
    private readonly workspaceMemberRepository: WorkspaceMemberRepository,
    private readonly workspaceInvitationRepository: WorkspaceInvitationRepository,

    private readonly emailService: EmailService
  ) {}

  /*handle create workspace*/
  async handleCreateWorkspace(
    session: SessionData,
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
              id: session.user.id,
            },
          },
        },
      });
      // save workspace in session
      session.workspace = {
        id: createWorkspace.id,
        role: WorkspaceMemberRole.ADMIN, // Role admin by default for the creator
      };
      return MutateResultFactory.ok({
        errors: null,
        workspace: createWorkspace,
      });
    } catch (e) {
      this.logger.error('Error creating workspace', e);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  /*handle is workspace slug valid*/
  async handleIsWorkspaceSlugValid(
    input: IsWorkspaceSlugValidDto
  ): Promise<boolean> {
    try {
      // check if slug is unique
      const findWorkspace = await this.workspaceRepository.findUnique({
        where: {
          slug: input.slug,
        },
      });
      return !findWorkspace;
    } catch (e) {
      this.logger.error('Error finding workspace', e);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  /* handle send workspace invitation */
  async handleSendWorkspaceInvitation(
    workspaceId: string,
    input: CreateWorkspaceInvitationDto
  ): Promise<CreateWorkspaceInvitationModel> {
    try {
      const errors = new CreateWorkspaceInvitationErrorBuilder();
      // we check if the workspace exists
      const workspace = await this.workspaceRepository.findUnique({
        where: {
          id: workspaceId,
        },
        include: {
          owner: true,
        },
      });
      if (!workspace) {
        errors.setWorkspaceNotFound();
        return MutateResultFactory.err({
          errors: errors.build(),
          invitation: null,
        });
      }

      // check if email already member of workspace
      const findMember = await this.workspaceMemberRepository.findFirst({
        where: {
          workspaceId: workspace.id,
          user: {
            email: input.email,
          },
        },
      });

      if (findMember) {
        errors.setEmailAlreadyMember();
        return MutateResultFactory.err({
          errors: errors.build(),
          invitation: null,
        });
      }
      // Check if email is already invited
      const findInvitation = await this.workspaceInvitationRepository.findFirst(
        {
          where: {
            email: input.email,
            // and it should be expired
            expiresAt: {
              gt: new Date(),
            },
            // and still pending
            status: WorkspaceInvitationStatus.PENDING,
          },
        }
      );
      if (findInvitation) {
        errors.setEmailAlreadyInvited();
        return MutateResultFactory.err({
          errors: errors.build(),
          invitation: null,
        });
      }
      // Create invitation
      const workspaceInvitation =
        await this.workspaceInvitationRepository.create({
          data: {
            workspaceId: workspace.id,
            email: input.email,
            role: input.role,
            expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 15), // expire in 15 days
          },
        });
      // send the invitaion via email
      await this.emailService.sendWorkspaceInvitationEmail({
        email: input.email,
        url: '', // TODO: setup invitation url
        workspaceName: workspace.name,
      });
      return MutateResultFactory.ok({
        errors: null,
        invitation: workspaceInvitation,
      });
    } catch (e) {
      this.logger.error('Error sending workspace invitation', e);
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
