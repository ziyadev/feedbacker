import { CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';
export abstract class AuthStrategy implements CanActivate {
  public abstract canActivate(context: ExecutionContext): Promise<boolean>;
  protected req: Request | null = null;
  protected getRequest(context: ExecutionContext): Request {
    if (context.getType() === 'http') {
      this.req = context.switchToHttp().getRequest();
    } else if (context.getType<GqlContextType>() === 'graphql') {
      this.req = GqlExecutionContext.create(context).getContext().req;
    }
    if (!this.req) {
      throw new Error('Request is not available');
    }
    return this.req;
  }
}
