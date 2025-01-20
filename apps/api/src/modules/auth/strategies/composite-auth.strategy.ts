import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ApiKeyStrategy } from './api-key.strategy';
import { UserSessionStrategy } from './user-session.strategy';

@Injectable()
export class CompositeAuthStrategy implements CanActivate {
  constructor(
    private userSessionStrategy: UserSessionStrategy,
    private apiKeyStrategy: ApiKeyStrategy,
    private reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isUserSessionValid = await this.userSessionStrategy.validate(context);
    const isApiKeyValid = await this.apiKeyStrategy.validate(context);
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler()
    );

    if (isPublic) return true; // if the route is public, we don't need to check for auth
    console.log(isUserSessionValid);
    console.log(isApiKeyValid);
    if (!isUserSessionValid && !isApiKeyValid) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
