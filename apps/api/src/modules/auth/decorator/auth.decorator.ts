import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guard/auth.guard';

export function Auth() {
  const guards = [AuthGuard];

  return applyDecorators(UseGuards(...guards));
}
