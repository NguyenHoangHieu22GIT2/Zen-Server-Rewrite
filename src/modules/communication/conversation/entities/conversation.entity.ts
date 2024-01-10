import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { nameOfCollections } from 'src/common/constants/name-of-collections';

@Schema()
export class Conversation {
  _id: Types.ObjectId;

  @Prop({
    required: true,
    type: [Types.ObjectId],
    ref: nameOfCollections.EndUser,
  })
  users: Types.ObjectId[];
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
