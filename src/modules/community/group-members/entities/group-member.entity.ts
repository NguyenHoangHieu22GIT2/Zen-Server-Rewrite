import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { nameOfCollections } from 'src/common/constants/name-of-collections';

@Schema({ timestamps: true })
export class GroupMember {
  _id: Types.ObjectId;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: nameOfCollections.EndUser,
  })
  endUserId: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: nameOfCollections.Group })
  groupId: Types.ObjectId;

  createdAt: Date;

  updatedAt: Date;
}

export const GroupMemberSchema = SchemaFactory.createForClass(GroupMember);
