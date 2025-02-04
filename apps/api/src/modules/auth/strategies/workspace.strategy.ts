import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthStrategy } from './auth.strategy';

@Injectable()
export class WorkspaceStrategy extends AuthStrategy {
  constructor(private readonly reflector: Reflector) {
    super();
  }
  async canActivate(context: ExecutionContext) {
    const request = this.getRequest(context);
    const workspace = request.session.workspace;
    if (workspace) {
      const roles = this.reflector.get('roles', context.getClass());
      // if there is no roles set we skip the check
      if (!Array.isArray(roles)) return true;
      return roles.includes(request.session.workspace.role); // workspace role is in the roles array
    }
    return false;
  }
}
