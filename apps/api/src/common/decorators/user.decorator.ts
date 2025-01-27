import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';
export const User = createParamDecorator((_, context: ExecutionContext) => {
  let request: Request | null = null;
  if (context.getType() === 'http') {
    request = context.switchToHttp().getRequest();
  } else if (context.getType<GqlContextType>() === 'graphql') {
    request = GqlExecutionContext.create(context).getContext().req;
  }
  if (!request) {
    throw new Error('No request found');
  }
  const user = request.session.user;
  return user;
});
