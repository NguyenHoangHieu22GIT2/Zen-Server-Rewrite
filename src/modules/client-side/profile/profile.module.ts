import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { EnduserModule } from 'src/modules/users/enduser';
import { FriendModule } from 'src/modules/social/friend';
import { PostsModule } from '../posts/posts.module';
import { LikeModule } from 'src/modules/feeds/like';
import { CommentModule } from 'src/modules/feeds/comment';

@Module({
  controllers: [ProfileController],
  imports: [
    EnduserModule,
    FriendModule,
    PostsModule,
    LikeModule,
    CommentModule,
  ],
})
export class ProfileModule {}
