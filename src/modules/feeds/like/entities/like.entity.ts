import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { nameOfCollections } from 'src/common/constants/name-of-collections';
import { UserMinimalProp } from 'src/common/constants/user-minimal.prop';
import { userMinimalType } from 'src/common/types/objectTypes/user-minimal.type';

@Schema()
export class Like {
  _id: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: nameOfCollections.Post })
  postId: Types.ObjectId;

  @Prop({ required: true, type: UserMinimalProp })
  user: userMinimalType;
}

export const LikeSchema = SchemaFactory.createForClass(Like);
