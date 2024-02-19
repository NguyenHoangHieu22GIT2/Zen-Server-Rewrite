import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EndUser, EndUserSchema } from 'src/modules/users/enduser/';
import {
  AuthServiceStable,
  LocalStrategy,
  AuthSerializer,
  AuthRedisStableService,
  AuthServiceUnstable,
  AuthController,
} from './';

@Module({
  controllers: [AuthController],
  providers: [
    AuthServiceStable,
    AuthServiceUnstable,
    LocalStrategy,
    AuthSerializer,
    AuthRedisStableService,
  ],
  imports: [
    MongooseModule.forFeature([{ name: EndUser.name, schema: EndUserSchema }]),
  ],
})
export class AuthModule {}
