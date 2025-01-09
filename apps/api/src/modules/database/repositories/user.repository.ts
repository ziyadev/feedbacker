import { DatabaseService } from '@/modules/database/database.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
@Injectable()
export class UserRepository {
  constructor(private readonly db: DatabaseService) {}

  get tx() {
    return this.db.$transaction;
  }
  get create() {
    return this.db.user.create;
  }
  get findUnique() {
    return this.db.user.findUnique;
  }
  get findFirst() {
    return this.db.user.findFirst;
  }
  get findMany() {
    return this.db.user.findMany;
  }
  get update() {
    return this.db.user.update;
  }
  get delete() {
    return this.db.user.delete;
  }
  get deleteMany() {
    return this.db.user.deleteMany;
  }
  get count() {
    return this.db.user.count;
  }
  get findUniqueOrThrow() {
    return this.db.user.findUniqueOrThrow;
  }
  get findFirstOrThrow() {
    return this.db.user.findFirstOrThrow;
  }
}
export type UserRepositorySelect = Prisma.UserSelect;
