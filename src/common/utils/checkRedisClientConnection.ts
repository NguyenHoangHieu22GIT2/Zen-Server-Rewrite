import { RedisClient } from 'src/cores/redis/client.redis';

export function CheckRedisClientConnection() {
  return RedisClient.isOpen;
}
