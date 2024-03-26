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
import { IAuthServiceStableString } from './stable/auth.stable.interface';
import { IAuthUnstableServiceString } from './unstable/auth.unstable.interface';

@Module({
  controllers: [AuthController],
  providers: [
    { useClass: AuthServiceStable, provide: IAuthServiceStableString },
    { useClass: AuthServiceUnstable, provide: IAuthUnstableServiceString },
    LocalStrategy,
    AuthSerializer,
    AuthRedisStableService,
  ],
  imports: [
    MongooseModule.forFeature([{ name: EndUser.name, schema: EndUserSchema }]),
  ],
})
export class AuthModule {}
