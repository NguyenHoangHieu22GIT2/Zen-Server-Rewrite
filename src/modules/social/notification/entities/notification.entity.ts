import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { SchemaFieldTypes } from 'redis';
import { nameOfCollections } from 'src/common/constants/name-of-collections';
import { userMinimalType } from 'src/common/types/objectTypes/user-minimal.type';
import { EndUserId, NotificationId } from 'src/common/types/utilTypes/Brand';
import { TypeOfNotification } from 'src/common/types/utilTypes/typeOfNotification';

@Schema({ timestamps: true })
export class Notification {
  _id: NotificationId;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: nameOfCollections.EndUser,
  })
  userSentId: EndUserId;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: nameOfCollections.EndUser,
  })
  userReceivedId: EndUserId;

  @Prop({ required: true, type: String, default: 'announce' })
  typeOfNotification: TypeOfNotification;

  @Prop({ required: true, type: String })
  link: string;

  createdAt: Date;

  updatedAt: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
