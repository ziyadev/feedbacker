import { DatabaseService } from '@/modules/database/database.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserProfileRepository {
  constructor(private readonly db: DatabaseService) {}

  get tx() {
    return this.db.$transaction;
  }
  get create() {
    return this.db.userProfile.create;
  }
  get findUnique() {
    return this.db.userProfile.findUnique;
  }
  get findFirst() {
    return this.db.userProfile.findFirst;
  }
  get findMany() {
    return this.db.userProfile.findMany;
  }
  get update() {
    return this.db.userProfile.update;
  }
  get delete() {
    return this.db.userProfile.delete;
  }
  get deleteMany() {
    return this.db.userProfile.deleteMany;
  }
  get count() {
    return this.db.userProfile.count;
  }
  get findUniqueOrThrow() {
    return this.db.userProfile.findUniqueOrThrow;
  }
  get findFirstOrThrow() {
    return this.db.userProfile.findFirstOrThrow;
  }
}

export type UserProfileRepositorySelect = Prisma.UserProfileSelect;
