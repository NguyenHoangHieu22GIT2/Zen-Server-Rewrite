import { Module } from '@nestjs/common';
import { PostServiceUnstable } from './unstable/post.unstable.service';
import { PostServiceStable } from './stable/post.stable.service';
import { PostController } from './post.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './entities/post.entity';

@Module({
  controllers: [PostController],
  providers: [PostServiceUnstable, PostServiceStable],
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
})
export class PostModule {}
