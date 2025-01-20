import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { AbstractStrategy } from '@nestjs/passport';
import { Request } from 'express';
@Injectable()
export class UserSessionStrategy implements AbstractStrategy {
  async validate(context: ExecutionContext) {
    let request: Request | null = null;
    if (context.getType() === 'http') {
      request = context.switchToHttp().getRequest(); // switch to http if it's http request
    } else if (context.getType<GqlContextType>() === 'graphql') {
      request = GqlExecutionContext.create(context).getContext().req; // get request from graphql context
    }
    return request.session.user;
  }
}
