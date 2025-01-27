import { RedisStore } from 'connect-redis';
import { redisClient } from './redis-client.config';

export const redisStore = new RedisStore({
  client: redisClient,
});
