import { DatabaseService } from '@/modules/database/database.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
@Injectable()
export class TokenRepository {
  constructor(private readonly db: DatabaseService) {}

  get tx() {
    return this.db.$transaction;
  }
  get create() {
    return this.db.verificationToken.create;
  }
  get findUnique() {
    return this.db.verificationToken.findUnique;
  }
  get findFirst() {
    return this.db.verificationToken.findFirst;
  }
  get findMany() {
    return this.db.verificationToken.findMany;
  }
  get update() {
    return this.db.verificationToken.update;
  }
  get delete() {
    return this.db.verificationToken.delete;
  }
  get deleteMany() {
    return this.db.verificationToken.deleteMany;
  }
  get count() {
    return this.db.verificationToken.count;
  }
  get findUniqueOrThrow() {
    return this.db.verificationToken.findUniqueOrThrow;
  }
  get findFirstOrThrow() {
    return this.db.verificationToken.findFirstOrThrow;
  }
}
export type TokenRepositorySelect = Prisma.VerificationTokenSelect;
