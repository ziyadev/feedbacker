import { Injectable } from '@nestjs/common';
import { WorkspaceStrategy } from '../strategies/workspace.strategy';

@Injectable()
export class WorkspaceGuard extends WorkspaceStrategy {}
