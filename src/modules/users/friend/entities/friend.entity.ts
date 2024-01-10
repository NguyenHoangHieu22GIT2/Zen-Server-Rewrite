import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { nameOfCollections } from 'src/common/constants/name-of-collections';

@Schema()
export class Friend {
  _id: Types.ObjectId;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: nameOfCollections.EndUser,
    index: { unique: true },
  })
  userId: Types.ObjectId;

  @Prop({
    required: true,
    type: [Types.ObjectId],
    ref: nameOfCollections.EndUser,
  })
  friends: Types.ObjectId[];
}

export const FriendSchema = SchemaFactory.createForClass(Friend);
