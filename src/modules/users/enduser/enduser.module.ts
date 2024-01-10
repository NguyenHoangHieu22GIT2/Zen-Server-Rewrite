import { Module } from '@nestjs/common';
import { EnduserService } from './enduser.service';
import { EnduserController } from './enduser.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EndUser, EndUserSchema } from './entities/enduser.entity';

@Module({
  controllers: [EnduserController],
  providers: [EnduserService],
  imports: [
    MongooseModule.forFeature([{ name: EndUser.name, schema: EndUserSchema }]),
  ],
})
export class EnduserModule {}
