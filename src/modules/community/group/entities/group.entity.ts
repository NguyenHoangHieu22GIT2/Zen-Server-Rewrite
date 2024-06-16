import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { nameOfCollections } from 'src/common/constants/name-of-collections';
import { EndUserId, GroupId } from 'src/common/types/utilTypes/Brand';

@Schema({ timestamps: true })
export class Group {
  _id: GroupId;

  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String })
  description: string;

  @Prop({ required: true, type: Boolean })
  isVisible: boolean;

  @Prop({ required: false, type: String })
  avatar: string;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: nameOfCollections.EndUser,
  })
  endUserId: EndUserId;

  createdAt: Date;

  updatedAt: Date;
}

export const GroupSchema = SchemaFactory.createForClass(Group);

GroupSchema.index(
  { name: 'text', description: 'text' },
  { weights: { name: 10, description: 5 } },
);
