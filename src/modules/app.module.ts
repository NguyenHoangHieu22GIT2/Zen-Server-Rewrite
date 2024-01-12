import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EnduserModule } from 'src/modules/users/enduser/enduser.module';
import { AdminModule } from 'src/modules/users/admin/admin.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/modules/auth/auth.module';
import { GroupModule } from 'src/modules/community/group/group.module';
import { LikeModule } from 'src/modules/feeds/like/like.module';
import { CommentModule } from 'src/modules/feeds/comment/comment.module';
import { PostModule } from 'src/modules/feeds/post/post.module';
import { FriendModule } from 'src/modules/social/friend/friend.module';
import { NotificationModule } from 'src/modules/social/notification/notification.module';
import { EventModule } from 'src/modules/community/event/event.module';
import { ConversationModule } from 'src/modules/communication/conversation/conversation.module';
import { MessageModule } from 'src/modules/communication/message/message.module';
import { GroupMembersModule } from './community/group-members/group-members.module';
import { GroupPostsModule } from './community/group-posts/group-posts.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017', {
      dbName: 'Zen',
      appName: 'Zen',
    }),
    EnduserModule,
    AdminModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    GroupModule,
    LikeModule,
    CommentModule,
    PostModule,
    FriendModule,
    EventModule,
    ConversationModule,
    MessageModule,
    NotificationModule,
    GroupMembersModule,
    GroupPostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
