import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  GroupPost,
  GroupPostSchema,
  GroupPostsServiceUnstable,
  GroupPostServiceStable,
  GroupPostsController,
} from './';

@Module({
  controllers: [GroupPostsController],
  providers: [GroupPostsServiceUnstable, GroupPostServiceStable],
  imports: [
    MongooseModule.forFeature([
      { name: GroupPost.name, schema: GroupPostSchema },
    ]),
  ],
})
export class GroupPostsModule {}
