import { Module } from '@nestjs/common';
import {
  PostController,
  PostRedisStableService,
  Post,
  PostSchema,
  PostServiceStable,
  PostServiceUnstable,
} from './';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [PostController],
  providers: [PostServiceUnstable, PostServiceStable, PostRedisStableService],
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
})
export class PostModule {}
