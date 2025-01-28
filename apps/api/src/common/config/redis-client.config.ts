import { createClient } from 'redis';
import { Logger } from '@nestjs/common';
export const redisClient = createClient();

redisClient.connect().catch(Logger.error);
