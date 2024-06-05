import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostModule } from 'src/modules/feeds/post';
import { CommentModule } from 'src/modules/feeds/comment';
import { LikeModule } from 'src/modules/feeds/like';

@Module({
  imports: [PostModule, CommentModule, LikeModule],
  controllers: [PostsController],
})
export class PostsModule {}
