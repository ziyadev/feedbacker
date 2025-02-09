import { DatabaseService } from '@/modules/database/database.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class FeedbackRepository {
  constructor(private readonly db: DatabaseService) {}

  get tx() {
    return this.db.$transaction;
  }
  get create() {
    return this.db.feedback.create;
  }
  get findUnique() {
    return this.db.feedback.findUnique;
  }
  get findFirst() {
    return this.db.feedback.findFirst;
  }
  get findMany() {
    return this.db.feedback.findMany;
  }
  get update() {
    return this.db.feedback.update;
  }
  get delete() {
    return this.db.feedback.delete;
  }
  get deleteMany() {
    return this.db.feedback.deleteMany;
  }
  get count() {
    return this.db.feedback.count;
  }
  get findUniqueOrThrow() {
    return this.db.feedback.findUniqueOrThrow;
  }
  get findFirstOrThrow() {
    return this.db.feedback.findFirstOrThrow;
  }
}

export type FeedbackRepositorySelect = Prisma.FeedbackSelect;
