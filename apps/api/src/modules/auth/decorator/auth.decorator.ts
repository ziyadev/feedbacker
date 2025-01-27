import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guard/auth.guard';
interface AuthOptions {}

export function Auth(options?: AuthOptions) {
  return applyDecorators(
    // SetMetadata('isPrivate', isPrivate),
    UseGuards(AuthGuard)
  );
}
