import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostModule } from 'src/modules/feeds/post';
import { CommentModule } from 'src/modules/feeds/comment';
import { LikeModule } from 'src/modules/feeds/like';
import { FriendModule } from 'src/modules/social/friend';

@Module({
  imports: [PostModule, CommentModule, LikeModule, FriendModule],
  controllers: [PostsController],
})
export class PostsModule {}
