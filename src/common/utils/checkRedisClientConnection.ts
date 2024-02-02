import { RedisClient } from 'src/cores/redis/client.redis';

export default function CheckRedisClientConnection() {
  return RedisClient.isOpen;
}
