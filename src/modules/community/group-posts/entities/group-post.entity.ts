import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class GroupPost {
  _id: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Post' })
  postId: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Group' })
  groupId: Types.ObjectId;
}

export const GroupPostSchema = SchemaFactory.createForClass(GroupPost);
