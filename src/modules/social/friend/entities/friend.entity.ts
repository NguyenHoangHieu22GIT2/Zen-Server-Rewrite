import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { nameOfCollections } from 'src/common/constants/name-of-collections';
import { EndUserId, FriendId } from 'src/common/types/utilTypes/Brand';

@Schema()
export class Friend {
  _id: FriendId;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: nameOfCollections.EndUser,
  })
  endUserId: EndUserId;

  @Prop({
    required: true,
    type: [Types.ObjectId],
    ref: nameOfCollections.EndUser,
  })
  endUserIds: EndUserId[];
}

export const FriendSchema = SchemaFactory.createForClass(Friend);
