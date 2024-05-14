import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  EndUser,
  EndUserSchema,
  EnduserController,
  EndUserRepository,
} from './';
import { IEndUserServiceString } from './services/enduser.interface.service';
import { EndUserService } from './services/enduser.unstable.service';
import { BaseRepositoryName } from 'src/cores/base-repository/Base.Repository.interface';

@Module({
  controllers: [EnduserController],
  providers: [
    {
      provide: IEndUserServiceString,
      useClass: EndUserService,
    },
    {
      provide: BaseRepositoryName,
      useClass: EndUserRepository,
    },
  ],
  imports: [
    MongooseModule.forFeature([{ name: EndUser.name, schema: EndUserSchema }]),
  ],
})
export class EnduserModule {}
