import { DatabaseService } from '@/modules/database/database.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class MediaImageRepository {
  constructor(private readonly db: DatabaseService) {}

  get tx() {
    return this.db.$transaction;
  }
  get create() {
    return this.db.mediaImage.create;
  }
  get findUnique() {
    return this.db.mediaImage.findUnique;
  }
  get findFirst() {
    return this.db.mediaImage.findFirst;
  }
  get findMany() {
    return this.db.mediaImage.findMany;
  }
  get update() {
    return this.db.mediaImage.update;
  }
  get delete() {
    return this.db.mediaImage.delete;
  }
  get deleteMany() {
    return this.db.mediaImage.deleteMany;
  }
  get count() {
    return this.db.mediaImage.count;
  }
  get findUniqueOrThrow() {
    return this.db.mediaImage.findUniqueOrThrow;
  }
  get findFirstOrThrow() {
    return this.db.mediaImage.findFirstOrThrow;
  }
}

export type MediaImageRepositorySelect = Prisma.MediaImageSelect;
