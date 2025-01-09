import { z } from 'zod';

const envSchema = z.object({
  JWT_SECRET: z.string(),
  DATABASE_URL: z.string(),
  NODE_ENV: z.enum(['development', 'production', 'test']).optional(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
});

export type Env = z.infer<typeof envSchema>;

export const envValidation = envSchema.parse;
