import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { UserMinimalProp } from 'src/common/constants/user-minimal.prop';
import { userMinimalType } from 'src/common/types/objectTypes/user-minimal.type';

@Schema({ timestamps: true })
export class Group {
  _id: Types.ObjectId;

  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String })
  description: string;

  @Prop({ required: true, type: Boolean })
  isVisible: boolean;

  @Prop({ required: true, type: String })
  avatar: string;

  @Prop({ required: true, type: UserMinimalProp })
  user: userMinimalType;

  createdAt: Date;

  updatedAt: Date;
}

export const GroupSchema = SchemaFactory.createForClass(Group);

GroupSchema.index(
  { name: 'text', description: 'text' },
  { weights: { name: 10, description: 5 } },
);
