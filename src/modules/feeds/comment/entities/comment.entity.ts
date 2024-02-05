import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { nameOfCollections } from 'src/common/constants/name-of-collections';
import { CommentId, EndUserId } from 'src/common/types/utilTypes/Brand';

@Schema({ timestamps: true })
export class Comment {
  _id: CommentId;

  @Prop({ required: true, type: Types.ObjectId, ref: nameOfCollections.Post })
  postId: Types.ObjectId;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: nameOfCollections.EndUser,
  })
  endUserId: EndUserId;

  @Prop({ required: true, type: String })
  content: string;

  @Prop({
    required: false,
    type: Types.ObjectId,
    ref: nameOfCollections.Comment,
  })
  parentCommentId: CommentId;

  createdAt: Date;

  updatedAt: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
