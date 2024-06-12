import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EndUser, EndUserSchema } from 'src/modules/users/enduser/';
import {
  LocalStrategy,
  AuthSerializer,
  AuthRedisService,
  AuthController,
  AuthService,
} from './';
import { IAuthServiceString } from './service/auth.interface';
import { BaseRepositoryName } from 'src/cores/base-repository/Base.Repository.interface';
import { AuthRepository } from './repository/auth.repository';

@Module({
  controllers: [AuthController],
  providers: [
    { useClass: AuthService, provide: IAuthServiceString },
    { provide: BaseRepositoryName, useClass: AuthRepository },
    LocalStrategy,
    AuthSerializer,
    AuthRedisService,
  ],
  imports: [
    MongooseModule.forFeature([{ name: EndUser.name, schema: EndUserSchema }]),
  ],
})
export class AuthModule {}
