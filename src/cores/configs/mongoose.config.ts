import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

@Injectable()
export class MongooseConfig implements MongooseOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createMongooseOptions():
    | MongooseModuleOptions
    | Promise<MongooseModuleOptions> {
    console.log('This is the config service:', this.configService);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const isTesting = this.configService.get<boolean>('testing');

    return {
      uri: this.configService.get<string>('db_url'),
      dbName: this.configService.get<string>('db_name'),
      appName: this.configService.get<string>('app_name'),
    };
  }
}
