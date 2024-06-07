import { Prop, Schema } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { nameOfCollections } from 'src/common/constants';
import { EndUserId } from 'src/common/types/utilTypes';

@Schema({ timestamps: true })
export class Receipt {
  @Prop({ type: String, required: true })
  type: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: nameOfCollections.EndUser,
  })
  endUserId: EndUserId;

  createdAt: Date;

  updatedAt: Date;
}
