import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { nameOfCollections } from 'src/common/constants/name-of-collections';
import { userMinimalType } from 'src/common/types/objectTypes/user-minimal.type';
import { EndUserId } from 'src/common/types/utilTypes/Brand';

@Schema()
export class Like {
  _id: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: nameOfCollections.Post })
  postId: Types.ObjectId;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: nameOfCollections.EndUser,
  })
  userId: EndUserId;
}

export const LikeSchema = SchemaFactory.createForClass(Like);
