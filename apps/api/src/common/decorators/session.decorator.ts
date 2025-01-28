import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { getRequest } from '../utils/getRequest';

export const Session = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = getRequest(ctx);
    return request.session;
  }
);
