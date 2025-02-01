import { DatabaseService } from '@/modules/database/database.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
@Injectable()
export class WorkspaceRepository {
  constructor(private readonly db: DatabaseService) {}

  get tx() {
    return this.db.$transaction;
  }
  get create() {
    return this.db.workspace.create;
  }
  get findUnique() {
    return this.db.workspace.findUnique;
  }
  get findFirst() {
    return this.db.workspace.findFirst;
  }
  get findMany() {
    return this.db.workspace.findMany;
  }
  get update() {
    return this.db.workspace.update;
  }
  get delete() {
    return this.db.workspace.delete;
  }
  get deleteMany() {
    return this.db.workspace.deleteMany;
  }
  get count() {
    return this.db.workspace.count;
  }
  get findUniqueOrThrow() {
    return this.db.workspace.findUniqueOrThrow;
  }
  get findFirstOrThrow() {
    return this.db.workspace.findFirstOrThrow;
  }
}
export type WorkspaceRepositorySelect = Prisma.WorkspaceSelect;
