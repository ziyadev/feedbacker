import { registerEnumType } from '@nestjs/graphql';

export enum WorkspaceMemberRole {
  ADMIN = 'admin',
  EDITOR = 'editor',
  VIEWER = 'viewer',
}

registerEnumType(WorkspaceMemberRole, {
  name: 'WorkspaceMemberRole',
});
