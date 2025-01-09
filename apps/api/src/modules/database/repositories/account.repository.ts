import { DatabaseService } from '@/modules/database/database.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class AccountRepository {
  constructor(private readonly db: DatabaseService) {}

  get tx() {
    return this.db.$transaction;
  }
  get create() {
    return this.db.account.create;
  }
  get findUnique() {
    return this.db.account.findUnique;
  }
  get findFirst() {
    return this.db.account.findFirst;
  }
  get findMany() {
    return this.db.account.findMany;
  }
  get update() {
    return this.db.account.update;
  }
  get delete() {
    return this.db.account.delete;
  }
  get deleteMany() {
    return this.db.account.deleteMany;
  }
  get count() {
    return this.db.account.count;
  }
  get findUniqueOrThrow() {
    return this.db.account.findUniqueOrThrow;
  }
  get findFirstOrThrow() {
    return this.db.account.findFirstOrThrow;
  }
}

export type AccountRepositorySelect = Prisma.AccountSelect;
