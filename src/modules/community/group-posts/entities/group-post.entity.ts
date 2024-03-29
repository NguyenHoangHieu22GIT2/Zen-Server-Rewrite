import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Post } from 'src/modules/feeds/post/entities/post.entity';

@Schema()
export class GroupPost extends Post {
  @Prop({ required: true, type: Types.ObjectId, ref: 'Group' })
  groupId: Types.ObjectId;
}

export const GroupPostSchema = SchemaFactory.createForClass(GroupPost);
