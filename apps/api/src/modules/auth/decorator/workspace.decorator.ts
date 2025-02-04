import { WorkspaceMemberRole } from '@/modules/workspace/model/workspace-member.model';
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { WorkspaceGuard } from '../guard/workspace.guard';
type WorkspaceOptions = {
  roles?: WorkspaceMemberRole[];
};

export function WorkspaceAuth(options?: WorkspaceOptions) {
  const guards = [WorkspaceGuard];

  return applyDecorators(
    SetMetadata('roles', options?.roles),
    UseGuards(...guards)
  );
}
