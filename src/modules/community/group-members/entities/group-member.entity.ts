import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { UserMinimalProp } from 'src/common/constants/user-minimal.prop';
import { userMinimalType } from 'src/common/types/objectTypes/user-minimal.type';

@Schema({ timestamps: true })
export class GroupMember {
  _id: Types.ObjectId;

  @Prop({ required: true, type: UserMinimalProp })
  user: userMinimalType;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Group' })
  groupId: Types.ObjectId;

  createdAt: Date;

  updatedAt: Date;
}

export const GroupMemberSchema = SchemaFactory.createForClass(GroupMember);
