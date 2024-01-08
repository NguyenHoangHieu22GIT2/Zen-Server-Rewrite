import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class BaseUser {
  @Prop({ required: true, type: String })
  username: string;

  @Prop({ required: true, type: String })
  password: string;
}
