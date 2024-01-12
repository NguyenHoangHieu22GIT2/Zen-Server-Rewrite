import { Module } from '@nestjs/common';
import { GroupPostsService } from './group-posts.service';
import { GroupPostsController } from './group-posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupPost, GroupPostSchema } from './entities/group-post.entity';

@Module({
  controllers: [GroupPostsController],
  providers: [GroupPostsService],
  imports: [
    MongooseModule.forFeature([
      { name: GroupPost.name, schema: GroupPostSchema },
    ]),
  ],
})
export class GroupPostsModule {}
