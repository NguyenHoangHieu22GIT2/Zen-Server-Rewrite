import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EnduserModule } from 'src/modules/users/enduser';
import { AdminModule } from 'src/modules/users/admin';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/modules/auth';
import { GroupModule } from 'src/modules/community/group';
import { LikeModule } from 'src/modules/feeds/like';
import { CommentModule } from 'src/modules/feeds/comment';
import { PostModule } from 'src/modules/feeds/post';
import { FriendModule } from 'src/modules/social/friend';
import { NotificationModule } from 'src/modules/social/notification';
import { EventModule } from 'src/modules/community/event';
import { ConversationModule } from 'src/modules/communication/conversation';
import { MessageModule } from 'src/modules/communication/message';
import { GroupMembersModule } from './community/group-members';
import { GroupPostsModule } from './community/group-posts';
import { MailerModule } from '@nestjs-modules/mailer';
import { UserRedis } from 'src/cores/redis/user.redis';
import { AuthorizationMiddleware } from 'src/cores/middlewares';
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
    GroupPostsModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserRedis],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthorizationMiddleware).forRoutes('*');
  }
}
