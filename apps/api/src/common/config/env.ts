import { z } from 'zod';

const envSchema = z.object({
  JWT_SECRET: z.string(),
  DATABASE_URL: z.string(),
  NODE_ENV: z.enum(['development', 'production', 'test']).optional(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
  PUBLIC_BASE_APP_URL: z.string().url(),
  PUBLIC_BASE_FRONT_URL: z.string().url(),
  CSRF_SECRET: z.string().min(4),
});

export type Env = z.infer<typeof envSchema>;

export const envValidation = envSchema.parse;
