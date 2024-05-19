import { Module } from '@nestjs/common';
import {
  PostController,
  PostRedisStableService,
  Post,
  PostSchema,
  PostService,
} from './';
import { MongooseModule } from '@nestjs/mongoose';
import { BaseRepositoryName } from 'src/cores/base-repository/Base.Repository.interface';
import { PostRepository } from './repository/post.repository';
import { IPostServiceString } from './services/unstable/post.interface';

@Module({
  controllers: [PostController],
  providers: [
    {
      provide: IPostServiceString,
      useClass: PostService,
    },
    PostRedisStableService,
    {
      provide: BaseRepositoryName,
      useClass: PostRepository,
    },
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
