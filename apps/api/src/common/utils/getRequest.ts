import { ExecutionContext } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';
export const getRequest = (ctx: ExecutionContext): Request => {
  let request: Request;
  if (ctx.getType() === 'http') {
    request = ctx.switchToHttp().getRequest();
  } else if (ctx.getType<GqlContextType>() === 'graphql') {
    request = GqlExecutionContext.create(ctx).getContext().req;
  }
  return request;
};
