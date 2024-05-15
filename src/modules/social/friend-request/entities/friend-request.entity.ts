import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { nameOfCollections } from 'src/common/constants';
import { EndUserId } from 'src/common/types/utilTypes';

type stateOfFriendRequest = 'pending' | 'accepted';
@Schema({ timestamps: true })
export class FriendRequest {
  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: nameOfCollections.EndUser,
  })
  leaderId: EndUserId;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: nameOfCollections.EndUser,
  })
  friendId: EndUserId;

  @Prop({
    required: true,
    type: String,
  })
  state: stateOfFriendRequest;

  createdAt: Date;

  updatedAt: Date;
}

export const FriendRequestSchema = SchemaFactory.createForClass(FriendRequest);
