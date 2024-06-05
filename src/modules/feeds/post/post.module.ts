import { Module } from '@nestjs/common';
import { PostController, Post, PostSchema, PostService } from './';
import { MongooseModule } from '@nestjs/mongoose';
import { BaseRepositoryName } from 'src/cores/base-repository/Base.Repository.interface';
import { PostRepository } from './repository/post.repository';
import { IPostServiceString } from './services/post.interface';
import { PostRedisService } from './services/post.redis.service';

@Module({
  controllers: [PostController],
  providers: [
    {
      provide: IPostServiceString,
      useClass: PostService,
    },
    {
      provide: BaseRepositoryName,
      useClass: PostRepository,
    },
    PostRedisService,
  ],
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
  exports: [
    {
      provide: IPostServiceString,
      useClass: PostService,
    },
  ],
})
export class PostModule {}
