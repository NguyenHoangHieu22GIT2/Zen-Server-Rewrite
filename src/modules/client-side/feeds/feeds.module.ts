import { Module } from '@nestjs/common';
import { FeedsController } from './feeds.controller';
import { PostModule } from 'src/modules/feeds/post';
import { CommentModule } from 'src/modules/feeds/comment';
import { LikeModule } from 'src/modules/feeds/like';

@Module({
  controllers: [FeedsController],
  imports: [PostModule, CommentModule, LikeModule],
})
export class FeedsModule {}
