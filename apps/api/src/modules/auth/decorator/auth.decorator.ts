import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guard/auth.guard';
interface AuthOptions {
  isPublic?: boolean;
}

export function Auth({ isPublic = true }: AuthOptions) {
  return applyDecorators(
    SetMetadata('isPublic', isPublic),
    UseGuards(AuthGuard)
  );
}
