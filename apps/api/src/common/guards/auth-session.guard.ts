import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';
@Injectable()
export class AuthSessionGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    let request: Request | null = null;
    if (context.getType() === 'http') {
      request = context.switchToHttp().getRequest();
    } else if (context.getType<GqlContextType>() === 'graphql') {
      request = GqlExecutionContext.create(context).getContext().req;
    }
    if (!request) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
