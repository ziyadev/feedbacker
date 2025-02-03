import { DatabaseService } from '@/modules/database/database.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class MediaRepository {
  constructor(private readonly db: DatabaseService) {}

  get tx() {
    return this.db.$transaction;
  }
  get create() {
    return this.db.media.create;
  }
  get findUnique() {
    return this.db.media.findUnique;
  }
  get findFirst() {
    return this.db.media.findFirst;
  }
  get findMany() {
    return this.db.media.findMany;
  }
  get update() {
    return this.db.media.update;
  }
  get delete() {
    return this.db.media.delete;
  }
  get deleteMany() {
    return this.db.media.deleteMany;
  }
  get count() {
    return this.db.media.count;
  }
  get findUniqueOrThrow() {
    return this.db.media.findUniqueOrThrow;
  }
  get findFirstOrThrow() {
    return this.db.media.findFirstOrThrow;
  }
}

export type MediaRepositorySelect = Prisma.MediaSelect;
