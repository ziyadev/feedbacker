import { Global, Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { Repositories } from './repositories';

@Global()
@Module({
  providers: [DatabaseService, ...Repositories],
  exports: [DatabaseService, ...Repositories],
})
export class DatabaseModule {}
