import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { getRequest } from '../utils/getRequest';

export const Cookie = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = getRequest(ctx);
    if (!data) {
      return request.cookies; // Return all cookies if no specific cookie name provided
    }
    return request.cookies?.[data]; // Safely access cookie property
  }
);
