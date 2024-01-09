import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Event {
  _id: Types.ObjectId;

  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String })
  description: string;

  @Prop({ required: true, type: Date })
  startAt: Date;

  @Prop({ required: true, type: Date })
  endAt: Date;

  @Prop({ required: true, type: String })
  wallpaper: string;

  createdAt: Date;

  updatedAt: Date;
}

export const EventSchema = SchemaFactory.createForClass(Event);

EventSchema.index(
  { name: 'text', description: 'text' },
  { weights: { name: 10, description: 5 } },
);
