import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export const corsConfig = {
  origin: [process.env.PUBLIC_BASE_APP_ORIGIN],
  credentials: true,
} satisfies CorsOptions;
