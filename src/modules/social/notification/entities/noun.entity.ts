import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { Types } from 'mongoose';

export type NounType = 'enduser' | 'post' | 'comment' | 'group';
const nounTypes: NounType[] = ['enduser', 'post', 'comment', 'group'];
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
  @IsEnum(nounTypes)
  type: NounType;

  @ApiProperty({
    title: 'image of subject',
    type: String,
    required: false,
  })
  image?: string;
}
