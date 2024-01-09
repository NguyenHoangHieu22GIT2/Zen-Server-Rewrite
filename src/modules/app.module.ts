import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EnduserModule } from './enduser/enduser.module';
import { AdminModule } from './admin/admin.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { GroupModule } from './group/group.module';
import { LikeModule } from './like/like.module';
import { CommentModule } from './comment/comment.module';
import { PostModule } from './post/post.module';
import { FriendModule } from './friend/friend.module';
import { EventModule } from './event/event.module';
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
