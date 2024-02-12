import { RedisClient } from 'src/cores/redis/client.redis';

export function ExecuteIfRedisAvailable<T>(fn: () => Promise<T>): Promise<T> {
  if (RedisClient.isOpen) return fn();
}
