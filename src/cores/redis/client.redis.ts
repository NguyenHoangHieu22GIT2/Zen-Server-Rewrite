import { RedisClientType, createClient } from 'redis';
import { config } from 'dotenv';

config();

export const RedisClient: RedisClientType = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
  },
});
