import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseUser } from 'src/base-user/entity/base-user.entity';

@Schema()
export class EndUser extends BaseUser {
  @Prop({ required: true, type: String })
  email: string;

  @Prop({ required: true, type: String })
  avatar: string;

  @Prop({ required: true, type: String })
  gender: string;

  @Prop({ required: true, type: Boolean, default: false })
  isBanned: boolean;

  @Prop({ required: true, type: [String], default: [] })
  restrict: string[];
}

export const EndUserSchema = SchemaFactory.createForClass(EndUser);
