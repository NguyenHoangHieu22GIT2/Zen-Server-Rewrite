import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { NotificationId } from 'src/common/types/utilTypes/Brand';
import { NounEntity } from './noun.entity';

export type NotificationType =
  | 'comment'
  | 'like'
  | 'mention' // TODO:Not implement for now, but will be in the future
  | 'friend_request';

/**
 * Use Event-Grammer Model
 * */
@Schema({ timestamps: true })
export class Notification {
  _id: NotificationId;

  @Prop({
    type: {
      _id: { type: Types.ObjectId, required: true },
      name: { type: String, required: true },
      type: { type: String, required: true },
      image: { type: String, required: true },
    },
  })
  subject: NounEntity;

  @Prop({ required: true, type: String })
  verb: NotificationType;

  @Prop({
    type: {
      _id: { type: Types.ObjectId, required: true },
      name: { type: String, required: true },
      type: { type: String, required: true },
      image: { type: String, required: true },
    },
  })
  directObject: NounEntity;

  @Prop({
    type: {
      _id: { type: Types.ObjectId, required: true },
      name: { type: String, required: true },
      type: { type: String, required: true },
      image: { type: String, required: true },
    },
  })
  indirectObject: NounEntity;

  @Prop({
    type: {
      _id: { type: Types.ObjectId, required: true },
      name: { type: String, required: true },
      type: { type: String, required: true },
      image: { type: String, required: true },
    },
  })
  prepObject: NounEntity;

  @Prop({ required: true, type: String })
  referenceLink: string;

  @Prop({ required: true, type: Boolean, default: false })
  read: boolean;

  createdAt: Date;

  updatedAt: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
