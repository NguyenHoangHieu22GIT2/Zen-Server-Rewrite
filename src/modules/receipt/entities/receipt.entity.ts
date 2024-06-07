import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { nameOfCollections } from 'src/common/constants';
import {
  EndUserId,
  ReceiptId,
  SubscriptionId,
} from 'src/common/types/utilTypes';

@Schema({ timestamps: true })
export class Receipt {
  _id: ReceiptId;

  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: nameOfCollections.Subscription,
  })
  subscriptionId: SubscriptionId;

  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: nameOfCollections.EndUser,
  })
  endUserId: EndUserId;

  createdAt: Date;

  updatedAt: Date;
}

export const ReceiptSchema = SchemaFactory.createForClass(Receipt);
