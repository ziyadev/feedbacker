import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthStrategy } from './auth.strategy';
@Injectable()
export class SessionStrategy extends AuthStrategy {
  constructor() {
    super();
  }
  async canActivate(context: ExecutionContext) {
    const request = this.getRequest(context);
    const user = request.session.user;
    return !!user;
  }
}
