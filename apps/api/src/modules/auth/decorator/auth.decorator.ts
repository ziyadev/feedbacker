import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guard/auth.guard';
type AuthOptions = {};

export function Auth(options?: AuthOptions) {
  return applyDecorators(
    // SetMetadata('isPrivate', isPrivate),
    UseGuards(AuthGuard)
  );
}
