import { createClient } from 'redis';
import { Logger } from '@nestjs/common';
export const redisClient = createClient()
  .connect()
  .then(() => Logger.log('Redis client connected'))
  .catch(() => Logger.error('Redis client connection error'));
