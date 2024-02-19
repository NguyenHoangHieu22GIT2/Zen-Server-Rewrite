import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  LikeServiceUnstable,
  LikeServiceStable,
  LikeController,
  Like,
  LikeSchema,
} from './';

@Module({
  controllers: [LikeController],
  providers: [LikeServiceUnstable, LikeServiceStable],
  imports: [
    MongooseModule.forFeature([{ name: Like.name, schema: LikeSchema }]),
  ],
})
export class LikeModule {}
