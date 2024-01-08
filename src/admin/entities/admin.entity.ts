import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseUser } from 'src/base-user/entity/base-user.entity';
import { SUPERVISORROLE, role } from 'src/constants/admin';

@Schema()
export class Admin extends BaseUser {
  @Prop({ required: true, default: [], type: [String] })
  logs_ban: string[];

  @Prop({ required: true, default: [], type: [String] })
  logs_restrict: string[];

  @Prop({ required: true, default: SUPERVISORROLE, type: String })
  role: role;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
