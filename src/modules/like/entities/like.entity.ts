import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { UserMinimalProp } from 'src/common/constants/user-minimal.prop';
import { userMinimalType } from 'src/common/types/objectTypes/user-minimal.type';

@Schema()
export class Like {
  @Prop({ required: true, type: Types.ObjectId, ref: 'Post' })
  postId: string;

  @Prop({ required: true, type: UserMinimalProp })
  user: userMinimalType;
}

export const LikeSchema = SchemaFactory.createForClass(Like);
