import { Module } from '@nestjs/common';
import { WorkspaceResolver } from './workspace.resolver';
import { WorkspaceService } from './workspace.service';

@Module({
  exports: [WorkspaceService],
  providers: [WorkspaceService, WorkspaceResolver],
})
export class WorkspaceModule {}
