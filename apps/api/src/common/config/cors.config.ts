import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export const corsConfig = {
  origin: [process.env.PUBLIC_BASE_FRONTEND_URL],
  credentials: true,
} satisfies CorsOptions;
