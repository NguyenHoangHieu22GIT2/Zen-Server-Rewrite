import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { NotificationType } from './notification.entity';

export class NounEntity {
  @ApiProperty({
    title: 'id of subject',
    type: String,
    required: true,
  })
  _id: Types.ObjectId;

  @ApiProperty({
    title: 'string of subject',
    type: String,
    required: true,
  })
  name: string;

  @ApiProperty({
    title: 'type of subject',
    type: String,
    required: true,
  })
  type: NotificationType;

  @ApiProperty({
    title: 'image of subject',
    type: String,
    required: true,
  })
  image: string;
}
