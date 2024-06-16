import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { nameOfCollections } from 'src/common/constants';
import { EndUserId, GroupId } from 'src/common/types/utilTypes';

type stateOfGroupMemberRequest = 'pending' | 'accepted';
@Schema({ timestamps: true })
export class GroupMemberRequest {
  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: 'EndUser',
  })
  endUserId: EndUserId;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: nameOfCollections.Group,
  })
  groupId: GroupId;

  @Prop({
    required: true,
    type: String,
    default: 'pending',
  })
  state: stateOfGroupMemberRequest;

  createdAt: Date;

  updatedAt: Date;
}

export const GroupMemberRequestSchema =
  SchemaFactory.createForClass(GroupMemberRequest);
