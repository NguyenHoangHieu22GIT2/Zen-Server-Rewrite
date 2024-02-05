import { Module } from '@nestjs/common';
import { LikeServiceUnstable } from './services/unstable/like.unstable.service';
import { LikeServiceStable } from './services/stable/like.stable.service';
import { LikeController } from './like.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Like, LikeSchema } from './entities/like.entity';

@Module({
  controllers: [LikeController],
  providers: [LikeServiceUnstable, LikeServiceStable],
  imports: [
    MongooseModule.forFeature([{ name: Like.name, schema: LikeSchema }]),
  ],
})
export class LikeModule {}
