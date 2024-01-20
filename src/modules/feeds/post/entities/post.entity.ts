import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { nameOfCollections } from 'src/common/constants/name-of-collections';
import { EndUserId, PostId } from 'src/common/types/utilTypes/Brand';

class BasePost {
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
  userId: EndUserId;

  createdAt: Date;

  updatedAt: Date;
}

@Schema({ timestamps: true })
export class Post extends BasePost {
  @Prop({
    required: false,
    type: String,
    default: [],
  })
  images: string[];

  @Prop({
    required: false,
    type: String,
    default: [],
  })
  files: string[];
}

export const PostSchema = SchemaFactory.createForClass(Post);

PostSchema.index(
  { title: 'text', body: 'text' },
  { weights: { title: 10, body: 2 } },
);
