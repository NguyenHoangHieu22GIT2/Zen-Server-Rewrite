import { Module } from '@nestjs/common';
import { GroupPostsController } from './group-posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupPost, GroupPostSchema } from './entities/group-post.entity';
import { GroupPostsServiceUnstable } from './services/unstable/group-posts.unstable.service';
import { GroupPostServiceStable } from './services/stable/group-posts.stable.service';

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
