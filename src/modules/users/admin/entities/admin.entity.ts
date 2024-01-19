import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseUser } from 'src/cores/base-user/entity/base-user.entity';
import { SUPERVISORROLE, role } from 'src/common/constants/admin';
import { AdminId } from 'src/common/types/utilTypes/Brand';

@Schema()
export class Admin extends BaseUser {
  _id: AdminId;

  @Prop({ required: true, type: String, index: { unique: true } })
  username: string;

  @Prop({ required: true, default: [], type: [String] })
  logs_ban: string[];

  @Prop({ required: true, default: [], type: [String] })
  logs_restrict: string[];

  @Prop({ required: true, default: SUPERVISORROLE, type: String })
  role: role;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
