import { Module } from '@nestjs/common';
import { EnduserServiceUnstable } from './services/enduser.unstable.service';
import { EnduserController } from './enduser.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EndUser, EndUserSchema } from './entities/enduser.entity';
import { EnduserServiceStable } from './services/enduser.stable.service';

@Module({
  controllers: [EnduserController],
  providers: [EnduserServiceUnstable, EnduserServiceStable],
  imports: [
    MongooseModule.forFeature([{ name: EndUser.name, schema: EndUserSchema }]),
  ],
})
export class EnduserModule {}
