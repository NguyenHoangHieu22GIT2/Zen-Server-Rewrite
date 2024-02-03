import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './entities/post.entity';
import {
  PostRedisStableService,
  PostServiceUnstable,
  PostServiceStable,
} from './services/post.service.index';

@Module({
  controllers: [PostController],
  providers: [PostServiceUnstable, PostServiceStable, PostRedisStableService],
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
})
export class PostModule {}
