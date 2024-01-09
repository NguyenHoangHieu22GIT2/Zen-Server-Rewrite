import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { UserMinimalProp } from 'src/common/constants/user-minimal.prop';
import { userMinimalType } from 'src/common/types/objectTypes/user-minimal.type';

@Schema({ timestamps: true })
export class Post {
  @Prop({ required: true, type: String })
  title: string;

  @Prop({ required: true, type: String })
  body: string;

  @Prop({ required: true, type: Number, default: 1 })
  views: number;

  @Prop({
    required: true,
    type: UserMinimalProp,
  })
  user: userMinimalType;
}

export const PostSchema = SchemaFactory.createForClass(Post);

PostSchema.index(
  { title: 'text', body: 'text' },
  { weights: { title: 10, body: 2 } },
);
