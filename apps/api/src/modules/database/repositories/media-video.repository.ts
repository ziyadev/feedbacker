import { DatabaseService } from '@/modules/database/database.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class MediaVideoRepository {
  constructor(private readonly db: DatabaseService) {}

  get tx() {
    return this.db.$transaction;
  }
  get create() {
    return this.db.mediaVideo.create;
  }
  get findUnique() {
    return this.db.mediaVideo.findUnique;
  }
  get findFirst() {
    return this.db.mediaVideo.findFirst;
  }
  get findMany() {
    return this.db.mediaVideo.findMany;
  }
  get update() {
    return this.db.mediaVideo.update;
  }
  get delete() {
    return this.db.mediaVideo.delete;
  }
  get deleteMany() {
    return this.db.mediaVideo.deleteMany;
  }
  get count() {
    return this.db.mediaVideo.count;
  }
  get findUniqueOrThrow() {
    return this.db.mediaVideo.findUniqueOrThrow;
  }
  get findFirstOrThrow() {
    return this.db.mediaVideo.findFirstOrThrow;
  }
}

export type MediaVideoRepositorySelect = Prisma.MediaVideoSelect;
