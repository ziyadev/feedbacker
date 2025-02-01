import { DatabaseService } from '@/modules/database/database.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
@Injectable()
export class WorkspaceMemberRepository {
  constructor(private readonly db: DatabaseService) {}

  get tx() {
    return this.db.$transaction;
  }
  get create() {
    return this.db.workspaceMember.create;
  }
  get findUnique() {
    return this.db.workspaceMember.findUnique;
  }
  get findFirst() {
    return this.db.workspaceMember.findFirst;
  }
  get findMany() {
    return this.db.workspaceMember.findMany;
  }
  get update() {
    return this.db.workspaceMember.update;
  }
  get delete() {
    return this.db.workspaceMember.delete;
  }
  get deleteMany() {
    return this.db.workspaceMember.deleteMany;
  }
  get count() {
    return this.db.workspaceMember.count;
  }
  get findUniqueOrThrow() {
    return this.db.workspaceMember.findUniqueOrThrow;
  }
  get findFirstOrThrow() {
    return this.db.workspaceMember.findFirstOrThrow;
  }
}
export type WorkspaceMemberRepositorySelect = Prisma.WorkspaceMemberSelect;
