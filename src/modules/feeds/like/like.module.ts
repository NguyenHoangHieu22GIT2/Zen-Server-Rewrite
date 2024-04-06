import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  LikeServiceUnstable,
  LikeServiceStable,
  LikeController,
  Like,
  LikeSchema,
} from './';
import { ILikeServiceStableString } from './services/stable/like.stable.interface';
import { ILikeServiceUnstableString } from './services/unstable/like.unstable.interface';

@Module({
  controllers: [LikeController],
  providers: [
    {
      provide: ILikeServiceStableString,
      useClass: LikeServiceStable,
    },
    {
      provide: ILikeServiceUnstableString,
      useClass: LikeServiceUnstable,
    },
  ],
  imports: [
    MongooseModule.forFeature([{ name: Like.name, schema: LikeSchema }]),
  ],
})
export class LikeModule {}
