import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  EndUser,
  EndUserSchema,
  EnduserController,
  EndUserRepository,
  EndUserService,
} from './';
import { IEndUserServiceString } from './services/enduser.interface.service';
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
  exports: [
    {
      provide: IEndUserServiceString,
      useClass: EndUserService,
    },
  ],
})
export class EnduserModule {}
