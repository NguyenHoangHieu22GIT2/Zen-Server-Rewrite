// redis.config.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisClientType, createClient } from 'redis';
@Injectable()
export class RedisConfigService {
  constructor(private configService: ConfigService) {}

  get redisOptions(): RedisClientType {
    return createClient({
      socket: {
        host: this.configService.get<string>('redis_host'),
        port: this.configService.get<number>('redis_port'),
      },
    });
  }
}
