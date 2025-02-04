import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guard/auth.guard';
type AuthOptions = {};

export function Auth(options?: AuthOptions) {
  const guards = [AuthGuard];

  return applyDecorators(UseGuards(...guards));
}
