import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { nameOfCollections } from 'src/common/constants/name-of-collections';

@Schema({ timestamps: true })
export class Message {
  _id: Types.ObjectId;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: nameOfCollections.EndUser,
  })
  userId: Types.ObjectId;

  @Prop({ required: true, type: String })
  content: string;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: nameOfCollections.Conversation,
  })
  ConversationId: Types.ObjectId;

  visibility: 'retrieve' | 'delete' | 'normal';

  createdAt: Date;

  updatedAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
