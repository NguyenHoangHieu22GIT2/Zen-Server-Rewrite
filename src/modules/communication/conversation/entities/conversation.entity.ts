import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { ConversationId } from 'src/common/types/utilTypes';

@Schema({ timestamps: true })
export class Conversation {
  _id: ConversationId;

  @Prop({
    required: true,
    type: [Types.ObjectId],
    ref: 'EndUser',
  })
  endUserIds: Types.ObjectId[];

  @Prop({
    required: true,
    type: String,
    // Conversations without a name will use this default to see usernames
    default: '__username__',
  })
  name: string;

  createdAt: Date;

  updatedAt: Date;
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
