import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export const corsConfig = {
  origin: ['http://localhost:4000', 'http://app.localhost.com'],
  credentials: true,
} satisfies CorsOptions;
