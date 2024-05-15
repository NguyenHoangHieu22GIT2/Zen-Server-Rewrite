// import { DynamicModule, Module } from '@nestjs/common';
// import { RedisService } from './redis.service';
// import { ConfigModule, ConfigService } from '@nestjs/config';

import { Module } from '@nestjs/common';

@Module({})
export class RedisModule {
  // static registerAsync(configService: ConfigService): DynamicModule {
  //   return {
  //     module: RedisModule,
  //     imports: [ConfigModule],
  //     providers: [
  //       {
  //         provide: 'Config',
  //         useFactory: async(),
  //       },
  //     ],
  //   };
  // }
}
