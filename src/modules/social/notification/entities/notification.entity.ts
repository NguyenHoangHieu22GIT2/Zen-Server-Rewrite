import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { NotificationId } from 'src/common/types/utilTypes/Brand';
import { NounEntity } from './noun.entity';

export type NotificationType =
  | 'comment'
  | 'like'
  | 'mention' // TODO:Not implement for now, but will be in the future
  | 'friend-request'
  | 'group-member-request';

/**
 * Use Event-Grammer Model
 * */
@Schema({ timestamps: true, strictQuery: true })
export class Notification {
  _id: NotificationId;

  @Prop({
    type: NounEntity,
  })
  subject: NounEntity;

  @Prop({ required: true, type: String })
  verb: NotificationType;

  @Prop({
    type: NounEntity,
  })
  directObject: NounEntity;

  @Prop({
    type: NounEntity,
  })
  indirectObject: NounEntity;

  @Prop({
    type: NounEntity,
  })
  prepObject: NounEntity;

  @Prop({ required: false, type: String })
  referenceLink: string;

  @Prop({ required: true, type: Boolean, default: false })
  read: boolean;

  createdAt: Date;

  updatedAt: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
