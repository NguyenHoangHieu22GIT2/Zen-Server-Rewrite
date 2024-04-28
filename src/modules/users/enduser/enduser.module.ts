import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  EndUser,
  EndUserSchema,
  EnduserServiceStable,
  EnduserController,
  EnduserServiceUnstable,
  EndUserRepository,
} from './';

@Module({
  controllers: [EnduserController],
  providers: [EnduserServiceUnstable, EnduserServiceStable, EndUserRepository],
  imports: [
    MongooseModule.forFeature([{ name: EndUser.name, schema: EndUserSchema }]),
  ],
})
export class EnduserModule {}
