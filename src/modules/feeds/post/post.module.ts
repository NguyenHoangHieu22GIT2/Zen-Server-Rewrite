import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './entities/post.entity';
import { PostRedisStableService } from './services/stable/post.redis.stable.service';
import { PostServiceStable } from './services/stable/post.stable.service';
import { PostServiceUnstable } from './services/unstable/post.unstable.service';

@Module({
  controllers: [PostController],
  providers: [PostServiceUnstable, PostServiceStable, PostRedisStableService],
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
})
export class PostModule {}
