import { Module } from '@nestjs/common';
import { StorageResolver } from './storage.resolver';
import { StorageService } from './storage.service';

@Module({
  providers: [StorageService, StorageResolver],
  exports: [StorageService],
})
export class StorageModule {}
