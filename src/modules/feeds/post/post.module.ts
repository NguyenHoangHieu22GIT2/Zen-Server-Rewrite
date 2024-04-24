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
import { IPostServiceStableString } from './services/stable/post.stable.interface';
import { IPostServiceUnstableString } from './services/unstable/post.unstable.interface';
import { BaseRepositoryName } from 'src/cores/base-repository/Base.Repository.interface';
import { PostRepository } from './repository/post.repository';

@Module({
  controllers: [PostController],
  providers: [
    {
      provide: IPostServiceStableString,
      useClass: PostServiceStable,
    },
    {
      provide: IPostServiceUnstableString,
      useClass: PostServiceUnstable,
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
      provide: IPostServiceStableString,
      useClass: PostServiceStable,
    },
    {
      provide: IPostServiceUnstableString,
      useClass: PostServiceUnstable,
    },
  ],
})
export class PostModule {}
