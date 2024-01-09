import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Friend {
  _id: Types.ObjectId;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: 'User',
    index: { unique: true },
  })
  userId: string;

  @Prop({ required: true, type: [Types.ObjectId], ref: 'User' })
  friends: string[];
}

export const FriendSchema = SchemaFactory.createForClass(Friend);
