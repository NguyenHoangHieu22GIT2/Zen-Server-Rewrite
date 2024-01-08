import { RedisClientType, createClient } from 'redis';

export const RedisClient: RedisClientType = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
  },
});

RedisClient.on('error', (err) => console.error(err));
