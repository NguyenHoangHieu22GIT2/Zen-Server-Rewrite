import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { nameOfCollections } from 'src/common/constants/name-of-collections';
import {
  ConversationId,
  EndUserId,
  MessageId,
} from 'src/common/types/utilTypes';

@Schema({ timestamps: true })
export class Message {
  _id: MessageId;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: nameOfCollections.EndUser,
  })
  endUserId: EndUserId;

  @Prop({ required: true, type: String })
  content: string;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: nameOfCollections.Conversation,
  })
  conversationId: ConversationId;

  @Prop({
    required: true,
    type: String,
    default: 'normal',
  })
  visibility: 'retrieve' | 'delete' | 'normal';

  @Prop({
    required: true,
    type: Boolean,
    default: false,
  })
  read: boolean;

  createdAt: Date;

  updatedAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
