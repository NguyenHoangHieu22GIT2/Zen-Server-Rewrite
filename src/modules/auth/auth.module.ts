import { Module } from '@nestjs/common';
import { AuthServiceStable } from './stable/auth.stable.service';
import { AuthServiceUnstable } from './unstable/auth.unstable.service';
import { AuthController } from './auth.controller';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import {
  EndUser,
  EndUserSchema,
} from 'src/modules/users/enduser/entities/enduser.entity';
import { LocalStrategy } from './passport/local.strategy';
import { AuthSerializer } from './passport/Serialize.provider';

@Module({
  controllers: [AuthController],
  providers: [
    AuthServiceStable,
    AuthServiceUnstable,
    LocalStrategy,
    AuthSerializer,
  ],
  imports: [
    MongooseModule.forFeature([{ name: EndUser.name, schema: EndUserSchema }]),
  ],
})
export class AuthModule {}
