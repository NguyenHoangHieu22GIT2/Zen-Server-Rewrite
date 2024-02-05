import { Module } from '@nestjs/common';
import { LikeService } from './services/unstable/like.unstable.service';
import { LikeController } from './like.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Like, LikeSchema } from './entities/like.entity';

@Module({
  controllers: [LikeController],
  providers: [LikeService],
  imports: [
    MongooseModule.forFeature([{ name: Like.name, schema: LikeSchema }]),
  ],
})
export class LikeModule {}
