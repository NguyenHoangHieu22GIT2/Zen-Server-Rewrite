import { Module } from '@nestjs/common';
import { AuthServiceStable } from './stable/auth.stable.service';
import { AuthServiceUnstable } from './unstable/auth.unstable.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EndUser, EndUserSchema } from '../enduser/entities/enduser.entity';

@Module({
  controllers: [AuthController],
  providers: [AuthServiceStable, AuthServiceUnstable],
  imports: [
    MongooseModule.forFeature([{ name: EndUser.name, schema: EndUserSchema }]),
  ],
})
export class AuthModule {}
