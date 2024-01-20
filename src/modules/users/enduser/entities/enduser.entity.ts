import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EndUserId } from 'src/common/types/utilTypes/Brand';
import { BaseUser } from 'src/cores/base-user/entity/base-user.entity';

class EndUserDeprecated_one extends BaseUser {
  _id: EndUserId;

  @Prop({ required: true, type: String, index: 'text' })
  username: string;

  @Prop({ required: true, type: String, index: { unique: true } })
  email: string;

  @Prop({ required: false, type: String, default: '' })
  avatar: string;

  @Prop({ required: true, type: String })
  gender: string;

  createdAt: Date;

  updatedAt: Date;
}

/**
 * When Follow SOLID Principle (the O - Open - closed Principle in this case)
 * It will not work, and for some reason, change Schema place from EndUserDeprecated_one to EndUser solve the issue that the properties
 * in EndUser didn't get recoginize, but only the EndUserDeprecated_one
 * */
@Schema({ timestamps: true })
export class EndUser extends EndUserDeprecated_one {
  //Token for activate the account when first try to login
  @Prop({ required: false, type: String })
  activationToken: string;

  //Token for changing any credentials like password, email, or anything else.
  @Prop({ required: false, type: String })
  modifyToken: string;

  @Prop({ required: false, type: Date })
  expireTimeForModifyToken: Date;

  @Prop({ required: true, type: Boolean, default: false })
  isOnline: boolean;

  @Prop({ required: true, type: Date, default: Date.now() })
  offlineTime: Date;

  @Prop({ required: true, type: Boolean, default: false })
  isBanned: boolean;

  @Prop({ required: true, type: [String], default: [] })
  restrict: string[];

  @Prop({ required: false, type: String })
  description: string;
}

export const EndUserSchema = SchemaFactory.createForClass(EndUser);
