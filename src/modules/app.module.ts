import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { UserRedis } from 'src/cores/redis/user.redis';
import { EnduserModule } from './users/enduser/enduser.module';
import { AdminModule } from './users/admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { GroupModule } from './community/group/group.module';
import { LikeModule } from './feeds/like/like.module';
import { CommentModule } from './feeds/comment/comment.module';
import { PostModule } from './feeds/post/post.module';
import { FriendModule } from './social/friend/friend.module';
import { EventModule } from './community/event/event.module';
import { ConversationModule } from './communication/conversation/conversation.module';
import { MessageModule } from './communication/message/message.module';
import { NotificationModule } from './social/notification/notification.module';
import { GroupMembersModule } from './community/group-members/group-members.module';
import { AuthorizationMiddleware } from 'src/cores/middlewares/Authorization.middleware';

@Module({
  imports: [
    //Configurations
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    MongooseModule.forRoot(process.env.DB_URL, {
      dbName: process.env.DB_NAME,
      appName: process.env.APP_NAME,
    }),

    MailerModule.forRoot({
      transport: {
        service: process.env.MAILER_SERVICE,
        host: process.env.MAILER_HOST,
        auth: {
          user: process.env.MAILER_USERNAME,
          pass: process.env.MAILER_PASSWORD,
        },
      },
    }),
    //Modules
    EnduserModule,
    AdminModule,
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
  ],
  controllers: [AppController],
  providers: [AppService, UserRedis],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthorizationMiddleware).forRoutes('*');
  }
}
