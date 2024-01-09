import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { nameOfCollections } from 'src/common/constants/name-of-collections';
import { UserMinimalProp } from 'src/common/constants/user-minimal.prop';
import { userMinimalType } from 'src/common/types/objectTypes/user-minimal.type';

@Schema({ timestamps: true })
export class Comment {
  @Prop({ required: true, type: Types.ObjectId, ref: nameOfCollections.Post })
  postId: Types.ObjectId;

  @Prop({ required: true, type: UserMinimalProp })
  user: userMinimalType;

  @Prop({ required: true, type: String })
  content: string;

  @Prop({
    required: false,
    type: Types.ObjectId,
    ref: nameOfCollections.Comment,
  })
  parentCommentId: Types.ObjectId;

  createdAt: Date;

  updatedAt: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
