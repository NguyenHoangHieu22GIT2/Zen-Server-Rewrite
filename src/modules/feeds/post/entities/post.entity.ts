import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { nameOfCollections } from 'src/common/constants/';
import { EndUserId, GroupId, PostId } from 'src/common/types/utilTypes/';

@Schema({ timestamps: true })
export class Post {
  _id: PostId;

  @Prop({ required: true, type: String })
  title: string;

  @Prop({ required: true, type: String })
  body: string;

  @Prop({ required: true, type: Number, default: 1 })
  views: number;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: nameOfCollections.EndUser,
  })
  endUserId: EndUserId;

  @Prop({
    required: false,
    type: [String],
    default: [],
  })
  images: string[];

  @Prop({
    required: false,
    type: Types.ObjectId,
    ref: nameOfCollections.Group,
  })
  groupId?: GroupId;

  createdAt: Date;

  updatedAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);

PostSchema.index(
  { title: 'text', body: 'text' },
  { weights: { title: 10, body: 2 } },
);
