import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SubscriptionId } from 'src/common/types/utilTypes';

@Schema({ timestamps: true })
export class Subscription {
  _id: SubscriptionId;

  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: Number })
  price: number;

  @Prop({ required: true, Type: String })
  description: string;

  createdAt: Date;

  updatedAt: Date;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
