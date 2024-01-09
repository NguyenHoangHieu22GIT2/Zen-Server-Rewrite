import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { UserMinimalProp } from 'src/common/constants/user-minimal.prop';
import { userMinimalType } from 'src/common/types/objectTypes/user-minimal.type';

@Schema({ timestamps: true })
export class Comment {
  @Prop({ required: true, type: Types.ObjectId, ref: 'Post' })
  postId: string;

  @Prop({ required: true, type: UserMinimalProp })
  user: userMinimalType;

  @Prop({ required: true, type: String })
  content: string;

  @Prop({ required: false, type: Types.ObjectId, default: '' })
  parentCommentId: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
