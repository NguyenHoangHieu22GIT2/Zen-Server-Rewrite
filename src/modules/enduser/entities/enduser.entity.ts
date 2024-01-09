import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { BaseUser } from 'src/cores/base-user/entity/base-user.entity';

@Schema({ timestamps: true })
export class EndUser extends BaseUser {
  _id: Types.ObjectId;

  @Prop({ required: true, type: String, index: 'text' })
  username: string;

  @Prop({ required: true, type: String, index: { unique: true } })
  email: string;

  @Prop({ required: false, type: String, default: '' })
  avatar: string;

  @Prop({ required: true, type: String })
  gender: string;

  @Prop({ required: true, type: Boolean, default: false })
  isBanned: boolean;

  @Prop({ required: true, type: [String], default: [] })
  restrict: string[];

  createdAt: Date;

  updatedAt: Date;
}

export const EndUserSchema = SchemaFactory.createForClass(EndUser);
