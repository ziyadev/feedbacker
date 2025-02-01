import { DatabaseService } from '@/modules/database/database.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
@Injectable()
export class WorkspaceInvitationRepository {
  constructor(private readonly db: DatabaseService) {}

  get tx() {
    return this.db.$transaction;
  }
  get create() {
    return this.db.workspaceInvitation.create;
  }
  get findUnique() {
    return this.db.workspaceInvitation.findUnique;
  }
  get findFirst() {
    return this.db.workspaceInvitation.findFirst;
  }
  get findMany() {
    return this.db.workspaceInvitation.findMany;
  }
  get update() {
    return this.db.workspaceInvitation.update;
  }
  get delete() {
    return this.db.workspaceInvitation.delete;
  }
  get deleteMany() {
    return this.db.workspaceInvitation.deleteMany;
  }
  get count() {
    return this.db.workspaceInvitation.count;
  }
  get findUniqueOrThrow() {
    return this.db.workspaceInvitation.findUniqueOrThrow;
  }
  get findFirstOrThrow() {
    return this.db.workspaceInvitation.findFirstOrThrow;
  }
}
export type WorkspaceInvitationRepositorySelect =
  Prisma.WorkspaceInvitationSelect;
