import { Module } from '@nestjs/common';
import { PostServiceUnstable } from './unstable/post.unstable.service';
import { PostServiceStable } from './stable/post.stable.service';
import { PostController } from './post.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './entities/post.entity';
import { PostRedisStableService } from './stable/post.redis.stable.service';

@Module({
  controllers: [PostController],
  providers: [PostServiceUnstable, PostServiceStable, PostRedisStableService],
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
})
export class PostModule {}
