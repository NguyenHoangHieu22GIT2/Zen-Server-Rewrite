import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { NotificationId } from 'src/common/types/utilTypes/Brand';

export type NotificationType =
  | 'comment'
  | 'like'
  | 'mention ' // TODO:Not implement for now, but will be in the future
  | 'friend_request';

/**
 * Use Event-Grammer Model
 * */
@Schema({ timestamps: true })
export class Notification {
  _id: NotificationId;

  @Prop({
    required: true,
    type: Types.ObjectId,
  })
  subjectId: Types.ObjectId;

  @Prop({ required: true, type: String })
  verb: NotificationType;

  @Prop({
    required: true,
    type: Types.ObjectId,
  })
  directObjectId: Types.ObjectId;

  @Prop({
    required: false,
    type: Types.ObjectId,
  })
  indirectObjectId: Types.ObjectId;

  @Prop({
    required: false,
    type: Types.ObjectId,
  })
  prepObjectId: Types.ObjectId;

  @Prop({ required: true, type: String })
  referenceLink: string;

  @Prop({ required: true, type: Boolean, default: false })
  read: boolean;

  createdAt: Date;

  updatedAt: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
