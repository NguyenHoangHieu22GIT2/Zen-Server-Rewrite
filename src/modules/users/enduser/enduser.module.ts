import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  EndUser,
  EndUserSchema,
  EnduserServiceStable,
  EnduserController,
  EnduserServiceUnstable,
} from './';

@Module({
  controllers: [EnduserController],
  providers: [EnduserServiceUnstable, EnduserServiceStable],
  imports: [
    MongooseModule.forFeature([{ name: EndUser.name, schema: EndUserSchema }]),
  ],
})
export class EnduserModule {}
